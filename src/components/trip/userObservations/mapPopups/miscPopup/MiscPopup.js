import {Popup} from "react-leaflet";
import React from "react";
import "./MiscPopup.css"


const MiscPopup = (props) => {

    return(
        <Popup className="misc-obs-popup">
            <div className="misc-text-background">
                {props.observation.note}
            </div>
        </Popup>
    )
}

export default MiscPopup;
