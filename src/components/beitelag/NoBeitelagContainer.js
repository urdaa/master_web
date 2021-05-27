import styled from "styled-components";
import {Button, Card, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {API} from "@aws-amplify/api";
import {createBeitelagCustom, createBeitelagMemberCustom, createJoinRequestCustom} from "../../graphql/customMutations";
import {Auth} from "@aws-amplify/auth";

const Layout = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 1600px) {
    width: 1600px;
  }
`

const ExistingBeitelag = styled.div`
  width: 250px;
  max-width: 500px;
  flex-grow: 1;
  margin-left: 10px;
`

const NewBeitelag = styled.div`
  width: 250px;
  max-width: 500px;
  flex-grow: 1;
  margin-right: 10px;
`

const TextBlock = styled(TextField)`
  display: block !important;
  margin-bottom: 25px !important;
`

const CustomCard = styled(Card)`
  width: 250px;
  padding: 0 20px 5px 20px;
  background-color: #fcfdff !important;
`

const CenterTitle = styled.h3`
    text-align: center;
`

const CustomButton = styled(Button)`
  color: #005914 !important;
`

const P = styled.p`
    margin-top: 5px;
`

const GrayText = styled.div`
  color: darkgray;
  font-style: italic;
  
`

const NoBeiteLagContainer = (props) => {
    const [beitelagName, setBeitelagName] = useState("");
    const [beitelagDescription, setBeitelagDescription] = useState("");

    const hasRequestedMembership = (requests) => {
        let hasRequested = false
        requests.items.forEach( req => {
            if (req.id === props.user.username) {
                hasRequested = true;
                return;
            }
        })
        return hasRequested;
    }

    const requestMembership = async (beitelag) => {
        console.log(beitelag.id)
        let memberInfo = {
            beitelagID: beitelag.id,
            id: props.user.username,
            nickname: props.user.attributes.nickname,
            email: props.user.attributes.email
        }
        console.log(memberInfo)
        let joinRequest = await API.graphql(
            {query: createJoinRequestCustom, variables: {input: memberInfo}}
        );
        console.log(joinRequest)
        let updatedBeitelag = props.beitelag.map( lag => {
            if (lag.owner === beitelag.owner) {
                lag.joinRequests.items = [joinRequest.data.createJoinRequest]
            }
            return lag;
        })
        props.setBeitelag([...updatedBeitelag])
    }

    const createBeitelag = async (ownerID, beitelagName, beitelagDescription, nickName) => {
        if (beitelagName.length < 3) {
            alert("Navn på beitelag må være minst 3 karakterer langt")
            return;
        }
        const beitelagInfo = {
            id: ownerID,
            name: beitelagName,
            description: beitelagDescription,
            members: [ownerID]
        }
        const beitelagMemberInfo = {
            beitelagID: ownerID,
            id: ownerID,
            nickName: nickName,
            sharedWith: []
        }

        try {
            // Create beitelag
            let lag = await API.graphql({
                query: createBeitelagCustom,
                variables: {input: beitelagInfo}
            })
            lag = lag.data.createBeitelag;
            // Add crator as member of beitelag
            let beitelagMember = await API.graphql({
                query: createBeitelagMemberCustom,
                variables: {input: beitelagMemberInfo}
            })
            beitelagMember = beitelagMember.data.createBeitelagMember;
            //Update state with new info
            beitelagMember.beitelag = lag;
            beitelagMember.beitelag.beitelagMembers.items = [beitelagMember];
            props.setBeitelagMembership(beitelagMember)
        }catch (e) {
            console.log(e)
            alert("Kunne ikke opprette beitelag")
        }
    }

    return(
        <Layout>
            <ExistingBeitelag>
                <CenterTitle>Søk medlemskap i beitelag</CenterTitle>
                {props.beitelag ?
                    <>
                        {props.beitelag.map(lag => (
                            <CustomCard key={lag.name}>
                                <P>
                                    <b>{lag.name}</b><br/>
                                    {lag.description}
                                </P>
                                {hasRequestedMembership(lag.joinRequests) ?
                                    <GrayText>AVVENTER GODKJENNING</GrayText>
                                    :
                                    <CustomButton
                                        size="small"
                                        variant="outlined"
                                        onClick={() => requestMembership(lag)}
                                    >
                                        Søk medlemskap
                                    </CustomButton>
                                }
                            </CustomCard>
                        ))}
                    </>
                    :
                    null
                }

            </ExistingBeitelag>
            <NewBeitelag>
                <CenterTitle>Opprett nytt beitelag</CenterTitle>
                <TextBlock
                    label="Beitelagets navn *"
                    variant="outlined"
                    onChange={event => setBeitelagName(event.target.value)}
                />

                <TextBlock
                    label="Kort beskrivelse"
                    variant="outlined"
                    multiline
                    rows={6}
                    onChange={event => setBeitelagDescription(event.target.value)}
                />
                <Button
                    onClick={
                        () => createBeitelag(
                            props.user.username,
                            beitelagName,
                            beitelagDescription,
                            props.user.attributes.nickname
                        )}
                    variant="outlined"
                >
                    Opprett
                </Button>
            </NewBeitelag>
        </Layout>

    );
}

export default NoBeiteLagContainer;
