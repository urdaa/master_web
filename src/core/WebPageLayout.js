import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {Button, Paper, Tab, Tabs} from "@material-ui/core";
import {useState} from "react";
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FrontPage from "../pages/FrontPage";
import MyTripsPage from "../pages/MyTripsPage";
import BeitelagPage from "../pages/BeitelagPage";
import ReportPage from "../pages/ReportPage";
import MyProfilePage from "../pages/MyProfilePage";
import {Auth} from "@aws-amplify/auth";


const Grid = styled.div`
  display: grid;
  min-height: 100vh;
  height: 100vh;
  grid-template-areas:
            "left-sidebar   header      right-sidebar"
            "left-sidebar   nav         right-sidebar"
            "left-sidebar   main        right-sidebar"
            "left-sidebar   footer      right-sidebar";
  grid-template-columns: auto minmax(200px, 1600px) auto;
  grid-template-rows:
			minmax(min-content, max-content)
            minmax(min-content, max-content)
			auto
			minmax(min-content, max-content);
`

const Header = styled.div`
  grid-area: header;
  flex-grow: 1;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Space = styled.div`
  flex: 1;
  @media (max-width: 540px){
    display: none;
  }
`

const PlainLink = styled(Link)`
  flex: 1;
  justify-content: center;
  text-decoration: none;
  color: #454955;
  &:hover {
    color: #2f3138;
  }
  &:active {
    color: black;
  }
`

const ProfileContainer = styled.div`
  flex: 1;
  justify-content: end;
  align-items: center;
  display: grid;
  min-width: max-content;
  grid-template-columns: auto auto;
  grid-auto-rows: auto auto;
  & > * {
    margin: 7px 10px 0 5px !important;
  }
`

const UserName = styled(PlainLink)`
  grid-column-start: span 2;
  text-align: start;
  font-weight: 500;
`

const SmallAvatar = styled(Avatar)`
  height: 33px !important;
  width: 33px !important;  
  background-color: #005914 !important;
`

const Nav = styled.div`
  grid-area: nav;
  margin: 0 10px;
`

const LeftAside = styled.div`
  grid-area: left-sidebar;
`

const RightAside = styled.div`
  grid-area: right-sidebar;
`

const Main = styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
  margin: 15px;  
`

const Footer = styled.div`
  grid-area: footer;
  background-color: #f5f9ff;
  text-align: center;
  color: lightgrey;
`

const WebPageLayout = (props) => {
    const [menuValue, setMenuValue] = useState(false);

    return (
        <Router>
            <Grid>
                <Header>
                    <Space/>

                    <PlainLink to="/" onClick={()=> setMenuValue(false)}>
                        <h1>MasterSau</h1>
                    </PlainLink>

                    <ProfileContainer>
                        <Link to="/min-profil" onClick={() => setMenuValue(false)}>
                            <SmallAvatar>
                                <AccountCircleIcon fontSize="small"/>
                            </SmallAvatar>
                        </Link>
                        <Button onClick={() => Auth.signOut()} variant="outlined">
                            Logg ut
                        </Button>
                        <UserName to="/min-profil" onClick={() => setMenuValue(false)}>
                            {props.user.attributes !== undefined ?
                                props.user.attributes.nickname
                                :
                                null
                            }
                        </UserName>
                    </ProfileContainer>
                </Header>

                <Nav>
                    <Paper elevation={2}>
                        <Tabs
                            value={menuValue}
                            onChange={(e, newValue) => setMenuValue(newValue)}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#005914"
                                }
                            }}
                            centered
                        >
                            <Tab label="Mine Turer" component={Link} to="/mine-turer"/>
                            <Tab label="Beitelag" component={Link} to="/beitelag">
                            </Tab>
                            <Tab label="Rapport" component={Link} to="/rapport"/>
                        </Tabs>

                    </Paper>
                </Nav>

                <Main>
                    <Switch>
                        <Route exact path="/">
                            <FrontPage/>
                        </Route>
                        <Route path="/mine-turer">
                            <MyTripsPage user={props.user}/>
                        </Route>
                        <Route path="/beitelag">
                            <BeitelagPage user={props.user}/>
                        </Route>
                        <Route path="/rapport">
                            <ReportPage user={props.user}/>
                        </Route>
                        <Route path="/min-profil">
                            <MyProfilePage user={props.user}/>
                        </Route>
                    </Switch>
                </Main>

                <LeftAside/>
                <RightAside/>

                <Footer>
                    sigurd.aasbrenn@gmail.com
                </Footer>
            </Grid>
        </Router>
    );
}

export default WebPageLayout;
