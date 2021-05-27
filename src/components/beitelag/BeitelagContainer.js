import styled from 'styled-components'
import TripList from "../map/TripList";
import LeafletMap from "../map/LeafletMap";
import React, {useEffect, useState} from "react";
import BeitelagInfo from "./BeitelagInfo";
import {Button} from "@material-ui/core";
import {API} from "@aws-amplify/api";
import {listTrips} from "../../graphql/queries";

const Layout = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 1600px) {
    width: 1600px;
  }
`


const BeiteLagContainer = (props) => {
    const [beitelagTrips, setBeitelagTrips] = useState([]);
    const [activeTrip, setActiveTrip] = useState({})

    useEffect( () => {
        fetchBeitelagTrips();
    }, [])

    const fetchBeitelagTrips = async () => {
        if (props.user.username !== undefined) {
            const memberInfo = {
                id: props.user.username
            }
            let trips = await API.graphql({query: listTrips, variables: memberInfo})
            setBeitelagTrips(trips.data.listTrips.items);
        }
    }

    return(
        <Layout>
            {Object.keys(activeTrip).length === 0 ?
                <React.Fragment>
                    <TripList trips={beitelagTrips} user={props.user} setActiveTrip={setActiveTrip}/>
                    <BeitelagInfo
                        beitelagMembership={props.beitelagMembership}
                        setBeitelagMembership={props.setBeitelagMembership}
                        user={props.user}
                        refreshBeitelagStatus={props.refreshBeitelagStatus}
                    />
                </React.Fragment>
                :
                <React.Fragment>
                    <TripList trips={beitelagTrips} user={props.user} setActiveTrip={setActiveTrip}/>
                    <LeafletMap activeTrip={activeTrip}/>
                </React.Fragment>
            }
        </Layout>
    );
}

export default BeiteLagContainer;
