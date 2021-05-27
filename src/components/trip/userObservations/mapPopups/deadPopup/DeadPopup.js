import {Popup} from "react-leaflet";
import React from "react";
import "./DeadPopup.css"


const DeadPopup = (props) => {

    return(

        <Popup className="predator-obs-popup">
            <div className="dead-text-background">
                <p className="p-no-margin">
                    <b>Gårdsnavn:</b> {props.observation.earTag.farmName}<br/>
                    <b>Øremerke-nr:</b> {props.observation.earTagNumber}
                </p>
            </div>
        </Popup>
    )
}

export default DeadPopup;
