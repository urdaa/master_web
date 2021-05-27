import {Popup} from "react-leaflet";
import React from "react";
import "./PredatorPopup.css"


const PredatorPopup = (props) => {

    return(
        <Popup className="other-obs-popup">
            <div className="predator-text-background">
                <p className="p-no-margin">
                    <b>Type:</b> {props.observation.predator}<br/>
                    <b>Antall:</b> {props.observation.number}<br/>
                    <b>Retning:</b> {props.observation.direction}
                </p>
            </div>
        </Popup>
    )
}

export default PredatorPopup;
