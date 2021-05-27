import {MapContainer, ScaleControl, TileLayer} from 'react-leaflet';
import styled from "styled-components";
import UserObservations from "../trip/userObservations/UserObservations";
import UserPath from "../trip/userLocation/UserPath";
import {useEffect, useState} from "react";
import MapPopUpContainer from "../trip/userObservations/mapPopups/MapPopupContainer";

const Map= styled(MapContainer)`
  flex-grow: 1;
  height: calc(100vh - 180px);
  width: 250px;
  margin: 0 10px;
`

const observationType = {
    SHEEP: 'sheep',
    PREDATOR: 'predator',
    MISC: 'misc',
    WOUNDED: 'wounded',
    DEAD: 'dead'
}

const LeafletMap = (props) => {
    const [userPath, setUserPath] = useState([]);
    const [observations, setObservations] = useState([]);

    useEffect( () => {
        if (Object.keys(props.activeTrip).length === 0) return;

        // Parse user path
        let userPath = props.activeTrip.userPath;
        userPath = JSON.parse(JSON.parse(userPath).replace(/[\uFEFF]/g, ''));
        setUserPath(userPath);

        //Parse observations
        let observations = props.activeTrip.observations
        observations = JSON.parse(observations)
        setObservations(observations)
    },[props.activeTrip])

    return(
        <Map center={[63.4193000, 10.4021237]} zoom={13}>
            <TileLayer
                url="https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}"
                attribution="&copy; <a href=&qout;http://www.kartverket.no/&qout;>Kartverket</a>"
            />
            <ScaleControl imperial={false} metric={true}/>
            <div>
                <UserPath previousPositions={userPath}/>
                <MapPopUpContainer
                    observations={observations}
                    observationType={observationType}
                    tripIsActive={false}/>
            </div>
        </Map>
    );
}
export default LeafletMap;
