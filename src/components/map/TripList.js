import React from "react";
import TripCard from "./TripCard";
import styled from "styled-components";
import Pagination from '@material-ui/lab/Pagination'

const Container = styled.div`
  
`

const TripList = (props) => {

    const getName = (tripInfo) => {
        if (props.user.username === tripInfo.id) {
            return props.user.attributes.nickname;
        }
    }

    const parseStartDate = (tripInfo) => {
        let startDate = tripInfo.started.split("T");
        return startDate[0];
    }

    const parseStartTime = (tripInfo) => {
        let startTime = tripInfo.started.split("T");
        return startTime[1].replace("Z", "");

    }

    const tripSorter = (tripString1, tripString2) => {
        let tripArray1 = tripString1.started.split("T");
        let tripArray2 = tripString2.started.split("T");
        //Checks Date
        let dateArray1 = tripArray1[0].split("-");
        let dateArray2 = tripArray2[0].split("-");

        for (let i = 0; i < dateArray1.length; i++) {
            if (parseInt(dateArray2[i]) - parseInt(dateArray1[i]) !== 0) {
                return parseInt(dateArray2[i]) - parseInt(dateArray1[i]);
            }
        }
        //Checks time
        let timeArray1 = tripArray1[1].split(":");
        let timeArray2 = tripArray2[1].split(":");
        for (let i = 0; i < timeArray1.length; i++) {
            if (parseInt(timeArray2[i]) - parseInt(timeArray1[i]) !== 0) {
                return  parseInt(timeArray2[i]) - parseInt(timeArray1[i]);
            }
        }
        return 0;
    }

    return(
        <Container>
            {props.trips.sort(tripSorter).map((tripInfo, index) => {
                return<TripCard
                        key={index}
                        tripInfo={tripInfo}
                        setActiveTrip={props.setActiveTrip}
                        startDate={parseStartDate(tripInfo)}
                        startTime={parseStartTime(tripInfo)}
                        tripOwner={getName(tripInfo)}/>
            })}
            <Pagination count={0} defaultPage={1} siblingCount={1} />
        </Container>
    );
}

export default TripList;
