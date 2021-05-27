import { PDFDownloadLink, Document, Page, Text, Image, StyleSheet, View } from '@react-pdf/renderer';
import {Button, ownerDocument} from "@material-ui/core";
import styled from "styled-components";
import {API} from "@aws-amplify/api";
import {listTrips} from "../graphql/queries";
import React, {useEffect, useState} from "react";

const styles = StyleSheet.create({
    body: {
        paddingTop: 55,
        paddingBottom: 65,
        paddingHorizontal: 55,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Times-Roman'
    },
    subtitle: {
        fontSize: 21,
        margin: 12,
        fontFamily: 'Times-Roman'
    },
    subsubtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Times-Roman'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    }
});

const Container = styled.div`
  min-width: 350px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const DownloadButton = styled(Button)`
  color: #005914 !important;
  border: 1px solid darkgray !important;
  text-decoration: none !important;
  width: 200px;
`
const P = styled.p`
  font-size: 20px;  
`

const observationType = {
    SHEEP: 'sheep',
    PREDATOR: 'predator',
    MISC: 'misc',
    WOUNDED: 'wounded',
    DEAD: 'dead'
}


const ReportPage = (props) => {
    const [ownTrips, setOwnTrips] = useState([]);

    useEffect( () => {
        fetchOwnTrips();
    }, [])
    const fetchOwnTrips = async () => {
        console.log(props.user)
        if (props.user.username !== undefined) {
            const memberInfo = {
                id: props.user.username,
                limit: 7
            }
            let trips = await API.graphql({query: listTrips, variables: memberInfo})
            setOwnTrips(trips.data.listTrips.items);
            console.log(trips)
        }
    }

    const getDownloadButton = () => {
        if (ownTrips.length === 0) {
            return null;
        } else {
            return(
                <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ?
                            <DownloadButton
                                disabled
                                outlined
                            >
                                Forbereder dokument
                            </DownloadButton>
                            :
                            <DownloadButton
                                outlined
                            >
                                Last ned
                            </DownloadButton>
                    }
                </PDFDownloadLink>
            )
        }
    }

    const getDate = (dateTimeString) => {
        return dateTimeString.split("T")[0];
    }

    const getTime = (dateTimeString) => {
        let timeString = dateTimeString.split("T")[1];
        return timeString.replace("Z", "");
    }

    const getNumObservations = (observations) => {
        let numObs = {
            sheep: 0,
            hurtSheep: 0,
            deadSheep: 0,
            predator: 0,
            other: 0,
        }
        let parsedObs = JSON.parse(observations);
        console.log(parsedObs)
        parsedObs.forEach(obs => {
            if (obs.observationData.observationType === observationType.SHEEP) {
                numObs.sheep += 1;
            } else if (obs.observationData.observationType === observationType.WOUNDED) {
                numObs.hurtSheep += 1;
            } else if (obs.observationData.observationType === observationType.DEAD) {
                numObs.deadSheep += 1;
            } else if (obs.observationData.observationType === observationType.PREDATOR) {
                numObs.predator += 1;
            } else if (obs.observationData.observationType === observationType.OTHER) {
                numObs.other += 1;
            }
        })
        return(
            <React.Fragment>
                <Text style={styles.text}>Sau: {numObs.sheep}</Text>
                <Text style={styles.text}>Skadde sau: {numObs.hurtSheep}</Text>
                <Text style={styles.text}>Døde sau: {numObs.deadSheep}</Text>
                <Text style={styles.text}>Rovdyr: {numObs.predator}</Text>
                <Text style={styles.text}>Annet: {numObs.other}</Text>
            </React.Fragment>
        )
    }

    const MyDoc = () => (
        <Document>
            <Page style={styles.body}>
                <View>
                    <Text style={styles.title}>Oversiktsrapport oppsynsturer</Text>
                    <Text style={styles.author}>Laget med MasterSau</Text>
                </View>
                {ownTrips.map( trip => (
                    <View>
                        <Text style={styles.subtitle}>Oppsynstur - {getDate(trip.started)} {getTime(trip.started)}</Text>
                        <Text style={styles.subsubtitle}>Antall observasjoner</Text>
                        {getNumObservations(trip.observations)}
                    </View>
                ))}

            </Page>
        </Document>
    );

    return(
        <Container>
            <h1>Genererer Oversiktsrapport</h1>
            <P>Her kan du generere oversiktsrapport basert på egne oppsynsturer.</P>
            {getDownloadButton()}
        </Container>
    );
}

export default ReportPage;
