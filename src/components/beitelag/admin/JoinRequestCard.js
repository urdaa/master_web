import React, {useEffect} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, Table} from "@material-ui/core";
import styled from "styled-components";

const JCard = styled(Card)`
  background-color: #fcfdff !important;
  margin-bottom: 15px;
`

const JCardContent = styled(CardContent)`
  padding-bottom: 0!important;  
`

const AcceptButton = styled(Button)`
  color: #005914 !important;
`

const DeclineButton = styled(Button)`
  color: #bf0000!important;
`

const TD = styled.td`
  min-width: 62px;
`

const JoinRequestCard = (props) => {

    return(
      <React.Fragment>
          <JCard>
              <JCardContent>
                  <Table>
                      <tbody>
                      <tr>
                          <TD><b>Bruker:</b></TD>
                          <td>{props.joinReq.nickname}</td>
                      </tr>
                      <tr>
                          <TD><b>Epost:</b></TD>
                          <td>{props.joinReq.email}</td>
                      </tr>
                      </tbody>
                  </Table>
              </JCardContent>
              <CardActions>
                  <AcceptButton
                      size="small"
                      onClick={() => props.accept(props.joinReq)}
                  >
                      Aksepter
                  </AcceptButton>
                  <DeclineButton
                      size="small"
                      onClick={() => props.decline(props.joinReq.id)}
                  >
                      Avslå
                  </DeclineButton>
              </CardActions>
          </JCard>
      </React.Fragment>
    );
}

export default JoinRequestCard;
