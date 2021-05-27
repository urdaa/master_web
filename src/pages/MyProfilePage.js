import styled from "styled-components";
import {TextField} from "@material-ui/core";

const Container = styled.div`
  min-width: 350px;
`

const TextBlock = styled(TextField)`
  display: block !important;
  margin-bottom: 25px !important;
`

const MyProfilePage = (props) => {

    return(
        <Container>
            <h2>
                Min profil
            </h2>

            <TextBlock
                label="Epost"
                defaultValue={props.user.attributes.email}
                variant="outlined"
                disabled
                fullWidth
            />

            <TextBlock
                label="Telefon"
                defaultValue={props.user.attributes.phone_number}
                variant="outlined"
                disabled
                fullWidth
            />

        </Container>
    );
}

export default MyProfilePage;
