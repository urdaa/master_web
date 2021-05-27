import {Popup} from "react-leaflet";
import React from "react";
import "./FarPopup.css"

const FarPopup = (props) => {

    return(
        <Popup className="far-obs-popup">
            <div className="row-top">
                <div className="sheep-and-number">
                    <span className="background-circle">
                        <img src="/white_sheep.png" className="sheep"/>
                    </span>
                    <b>{props.observation.lightSheep}</b>
                </div>
                <div className="sheep-and-number">
                    <span className="background-circle">
                        <img src="/black_sheep_flipped.png" className="sheep"/>
                    </span>
                    <b>{props.observation.darkSheep}</b>
                </div>
            </div>
        </Popup>
    )
}

export default FarPopup;
