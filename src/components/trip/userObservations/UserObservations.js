import React, {useEffect, useState} from "react";
import MapPopUpContainer from "./mapPopups/MapPopupContainer";

const observationType = {
    SHEEP: 'sheep',
    PREDATOR: 'predator',
    MISC: 'misc',
    WOUNDED: 'wounded',
    DEAD: 'dead'
}

const UserObservations = (props) => {
    const [observations, setObservations] = useState([]);

    //Loads existing observations or sets up for new ones
    useEffect( () => {
            setObservations(props.previousObservations)
    },[]);

    return(
        <div>

            <MapPopUpContainer
                observations={observations}
                tripIsActive={false}
            />
        </div>

    )
}

export default UserObservations;
