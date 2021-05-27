import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import JoinRequestCard from "./JoinRequestCard";
import {API} from "@aws-amplify/api";
import {
    createBeitelagMemberCustom,
    createJoinRequestCustom,
    deleteJoinRequestCustom
} from "../../../graphql/customMutations";
import {deleteBeitelag, deleteBeitelagMember, updateBeitelag, updateBeitelagMember} from "../../../graphql/mutations";
import DeleteMemberDialog from "./DeleteMemberDialog";
import DeleteBeitelagDialog from "./DeleteBeitelagDialog";

const AdminTitle = styled.h2`
  margin-top: 50px;
`

const AdminButton = styled(Button)`
  color: #bf0000!important;
  display: block !important;
  margin-bottom: 15px!important;
`

const BeitelagAdmin = (props) => {
    const [memberDialogIsOpen, setMemberDialogIsOpen] = useState(false);
    const [beitelagDialogIsOpen, setBeitelagDialogIsOpen] = useState(false);

    const createMember = async (req) => {
        // Create new beitelagmember
        const userInfo = {
            id: req.id,
            nickName: req.nickname,
            beitelagID: props.beitelagMembership.id,
            sharedWith: props.beitelagMembership.beitelag.members
        };
        let newMember = await API.graphql(
            {query: createBeitelagMemberCustom, variables: {input: userInfo}}
        );

        // Update beitelag to include new member in members list (auth reasons)
        let updatedBeitelag = {
            id: props.beitelagMembership.beitelag.id,
            members: [...props.beitelagMembership.beitelag.members, req.id]
        }
        await API.graphql(
            {query: updateBeitelag, variables: {input: updatedBeitelag}}
        );

        //Update existing BeitelagMembers' SharedWith in in order to share with new member
        props.beitelagMembership.beitelag.members.forEach( member => {
            let updatedMember = {
                id: member,
                sharedWith: [...props.beitelagMembership.beitelag.members, req.id]
            };
            API.graphql({query: updateBeitelagMember, variables: {input: updatedMember}});
        });

        //Update add member to state
        let members = props.beitelagMembership.beitelag.beitelagMembers.items;
        members.push(newMember.data.createBeitelagMember);
        props.setBeitelagMembership({...props.beitelagMembership});

        //Delete joinrequest
        deleteJoinRequest(req.id);
    }

    const deleteJoinRequest = async (userID, beitelagDeletion = false) => {
        const userInfo = { id: userID };
        let deletedRequest = await API.graphql(
            {query: deleteJoinRequestCustom, variables: {input: userInfo}}
        );
        if(!beitelagDeletion) {
            // Remove deleted request from state
            let joinRequests = props.beitelagMembership.beitelag.joinRequests.items;
            joinRequests = joinRequests.filter( req => req.id !== deletedRequest.data.deleteJoinRequest.id)
            props.beitelagMembership.beitelag.joinRequests.items = joinRequests

            props.setBeitelagMembership({...props.beitelagMembership});
        }
    }

    const deleteMember = async (userID, beitelagDeletion= false) => {
        console.log(userID)
        const userInfo = { id: userID };
        let deletedMember = await API.graphql(
            {query: deleteBeitelagMember, variables: {input: userInfo}}
        );
        if(!beitelagDeletion) {
            //Updates members field on Beitelag
            let updatedBeitelagMembers = props.beitelagMembership.beitelag.members.filter(member => member !== userID);
            API.graphql({query: updateBeitelag, variables: {input: {
                        id: props.beitelagMembership.beitelag.id,
                        members: updatedBeitelagMembers,
                    }}});

            //Updates sharedWith field of remaining members
            updatedBeitelagMembers.forEach( member => {
                API.graphql({
                    query: updateBeitelagMember, variables: {
                        input: {
                            id: member,
                            sharedWith: updatedBeitelagMembers
                        }}});
            });
            //Remove deleted member from state
            let members = props.beitelagMembership.beitelag.beitelagMembers.items;
            members = members.filter( member => member.id !== deletedMember.data.deleteBeitelagMember.id);
            props.beitelagMembership.beitelag.beitelagMembers.items = members;
            props.setBeitelagMembership({...props.beitelagMembership});
        }
    }

    const deleteBeitelagAndRelated = async () => {
        props.setBeitelagMembership(null)
        //Delete join requests
        props.beitelagMembership.beitelag.joinRequests.items.forEach( req => deleteJoinRequest(req.id, true));
        //Delete all members (including owner)
        props.beitelagMembership.beitelag.members.forEach( member => deleteMember(member, true));
        //Delete beitelag
        API.graphql({query: deleteBeitelag, variables: {input: {
                    id: props.beitelagMembership.beitelag.id,
                }}});
        //Refreshing beitelag status
        props.refreshBeitelagStatus();
    }

    return(
      <React.Fragment>
          <AdminTitle>Administrator</AdminTitle>

          <h3>Medlems-forespørsler</h3>
          {props.beitelagMembership.beitelag.joinRequests.items.map(req => (
              <JoinRequestCard
                  key={req.id}
                  joinReq={req}
                  decline={deleteJoinRequest}
                  accept={createMember}
              />
          ))}

          <h3>Fare-område</h3>
          <AdminButton
              variant="outlined"
              onClick={() => setMemberDialogIsOpen(true)}
          >
              Fjern et medlem
          </AdminButton>
          <AdminButton
              variant="outlined"
              onClick={() => setBeitelagDialogIsOpen(true)}
          >
              Slett Beitelag
          </AdminButton>

          <DeleteMemberDialog
            isOpen={memberDialogIsOpen}
            setIsOpen={setMemberDialogIsOpen}
            beitelag={props.beitelagMembership.beitelag}
            delete={deleteMember}
          />

          <DeleteBeitelagDialog
            isOpen={beitelagDialogIsOpen}
            setIsOpen={setBeitelagDialogIsOpen}
            delete={deleteBeitelagAndRelated}
          />
      </React.Fragment>
    );
}

export default BeitelagAdmin;
