import React from "react";
import styled from "styled-components";
import {Button, Card} from "@material-ui/core";

const MCard = styled(Card)`
  margin: 0 0 0 10px;
  padding: 10px 20px;
  background-color: #fcfcfc !important;
  margin-bottom: 10px;
`

const MapButton = styled(Button)`
  color: #005914 !important;
`

const Table = styled.table`
    margin-bottom: 5px;
`

const TD = styled.td`
  min-width: 62px;
`

const TripCard = (props) => {

    return (
        <div>
            <MCard>
                <Table>
                    <tbody>
                        <tr>
                            <TD><b>{props.tripOwner}</b></TD>
                            <td><b></b></td>
                        </tr>
                        <tr>
                            <TD>{props.startDate}</TD>
                            <td>{props.startTime}</td>
                        </tr>
                    </tbody>
                </Table>
                <MapButton size="small" onClick={() => props.setActiveTrip(props.tripInfo)}>
                    Se tur
                </MapButton>

            </MCard>
        </div>
    );
}

export default TripCard;
