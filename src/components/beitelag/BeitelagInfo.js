import {useState} from "react";
import styled from "styled-components";
import BeitelagAdmin from "./admin/BeitelagAdmin";

const Container = styled.div`
  flex-grow: 1;
  width: 250px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 400px;
`


const BeitelagInfo = (props) => {

    const getAdminNickname = (userID) => {
        let adminMember = props.beitelagMembership.beitelag.beitelagMembers.items.find( item => (item.id === userID));
        return adminMember.nickName;
    }

    return(
      <Container>
          <Content>
              <h1>{props.beitelagMembership.beitelag.name}</h1>
              <p>{props.beitelagMembership.beitelag.description}</p>
              <p>
                  <b>Eier: </b><br/>
                  {getAdminNickname(props.beitelagMembership.beitelag.id)}
              </p>
              <p>
                  <b>Members:</b> <br/>
                  {props.beitelagMembership.beitelag.beitelagMembers.items.map( item => (
                      <span key={item.nickName}>{item.nickName}<br/></span>
                  ))}
              </p>

              {props.beitelagMembership.beitelag.id === props.user.username ?
                  <BeitelagAdmin
                      beitelagMembership={props.beitelagMembership}
                      setBeitelagMembership={props.setBeitelagMembership}
                      refreshBeitelagStatus={props.refreshBeitelagStatus}
                  />
                  :
                  null
              }
          </Content>

      </Container>
    );
}

export default BeitelagInfo;

