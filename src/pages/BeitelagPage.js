import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {API} from "@aws-amplify/api";
import NoBeiteLagContainer from "../components/beitelag/NoBeitelagContainer";
import BeiteLagContainer from "../components/beitelag/BeitelagContainer";
import {getBeitelagMemberCustom, listBeitelagsWithReq} from "../graphql/customQueries";



const BeitelagPage = (props) => {
    const [beitelagMembership, setBeitelagMembership] = useState(null);
    const [beitelagList, setBeitelagList] = useState(null);

    useEffect(() => {
        setBeitelagStatus()
    }, [])

    const setBeitelagStatus = async () => {
        //Check if user is part of beitelag
        let beitelagMember = await fetchBeitelagMember();
        if (beitelagMember !== null) {
            setBeitelagMembership(beitelagMember);
        } else {
            //If not fetch beitelag and existing join requests from that user
            let beitelag = await API.graphql({query: listBeitelagsWithReq})

            setBeitelagList(beitelag.data.listBeitelags.items)

        }
    }

    const fetchBeitelagMember = async () => {
        if (props.user.username !== undefined) {
            const memberInfo = {
                id: props.user.username
            }
            let beitelagMember = await API.graphql({query: getBeitelagMemberCustom, variables: memberInfo})
            beitelagMember = beitelagMember.data.getBeitelagMember;

            return beitelagMember;
        }
        return null;
    }

    const getContainer = (lag, membership) => {
        if (lag === null && membership === null) { // Loading
            return null;
        }
        else if (membership === null) { //Doesnt have membership
            return(
                <NoBeiteLagContainer
                    beitelag={beitelagList}
                    setBeitelag={setBeitelagList}
                    beitelagMembership={beitelagMembership}
                    setBeitelagMembership={setBeitelagMembership}
                    user={props.user}
                />
            );
        }
        else { //Is regular member beitelag
            return(
                <BeiteLagContainer
                    beitelagMembership={beitelagMembership}
                    setBeitelagMembership={setBeitelagMembership}
                    user={props.user}
                    refreshBeitelagStatus={setBeitelagStatus}
                />
            );
        }
    }

    return(
        <React.Fragment>
            {getContainer(beitelagList, beitelagMembership)}
        </React.Fragment>
    );
}

export default BeitelagPage;
