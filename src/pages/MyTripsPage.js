import React, {useEffect, useState} from "react";
import TripList from "../components/map/TripList";
import LeafletMap from "../components/map/LeafletMap";
import {API} from "@aws-amplify/api";
import {getBeitelagMemberCustom} from "../graphql/customQueries";
import {listTrips} from "../graphql/queries";

const MyTripsPage = (props) => {
    const [ownTrips, setOwnTrips] = useState([]);
    const [activeTrip, setActiveTrip] = useState({})

    useEffect( () => {
        fetchOwnTrips();
    }, [])

    const fetchOwnTrips = async () => {
        if (props.user.username !== undefined) {
            const memberInfo = {
                id: props.user.username,
                limit: 7
            }
            let trips = await API.graphql({query: listTrips, variables: memberInfo})
            setOwnTrips(trips.data.listTrips.items);
        }
    }

    return(
        <React.Fragment>
            <TripList trips={ownTrips} user={props.user} setActiveTrip={setActiveTrip}/>
            <LeafletMap activeTrip={activeTrip}/>
        </React.Fragment>
    );
}

export default MyTripsPage;
