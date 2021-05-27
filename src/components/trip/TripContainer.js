import React from "react";
import UserPath from "./userLocation/UserPath";
import UserObservations from "./userObservations/UserObservations";


const TripContainer =(props) => {
    return(
        <div>
            <UserPath
                previousPositions={props.previousPositions}/>
            <UserObservations
                mapRef={props.mapRef}
                previousObservations={props.previousObservations}/>
        </div>
    );
}

export default TripContainer;
