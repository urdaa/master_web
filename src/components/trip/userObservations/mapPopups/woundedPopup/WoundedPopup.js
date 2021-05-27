import {Popup} from "react-leaflet";
import React from "react";
import "./WoundedPopup.css"


const WoundedPopup = (props) => {

    return(

        <Popup className="other-obs-popup">
            <div className="wounded-text-background">
                <p className="p-no-margin">
                    <b>Alder:</b> {props.observation.lifeStage}<br/>
                    <b>Farge:</b> {props.observation.color}<br/>
                    <b>Skade:</b> {props.observation.injury}
                </p>
            </div>
        </Popup>
    )
}

export default WoundedPopup;
