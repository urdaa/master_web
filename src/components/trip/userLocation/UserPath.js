import React, {useEffect, useState} from "react";
import {Polyline} from "react-leaflet";
import StartAndFinishIcons from "./StartAndFinishIcons";

const UserPath = props => {

    return(
        <div>
            {props.previousPositions.map(({id, prevLatitude, prevLongitude, latitude, longitude}) => {
                    return <Polyline key={id} positions={[
                        [prevLatitude, prevLongitude], [latitude, longitude],
                    ]} color={'red'} />
                })}

            <StartAndFinishIcons
                tripType={props.tripType}
                positions={props.previousPositions}
            />
        </div>
    );
}

export default UserPath;
