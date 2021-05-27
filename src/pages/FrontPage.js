import styled from "styled-components";

const Container = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
const SheepLogo = styled.img`
  max-width: 190px;  
`

const P = styled.p`
  font-size: 20px;  
`

const FrontPage = () => {

    return(
        <Container>
            <h1>MasterSau Webportal</h1>
            <P>Forenkler oppsynsturer <br/> av sau  på beite</P>
            <SheepLogo src="./sheep_cropped.png"/>
        </Container>
    );
}

export default FrontPage;
