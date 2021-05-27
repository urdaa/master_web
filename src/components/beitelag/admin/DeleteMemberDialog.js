import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup
} from "@material-ui/core";
import {useState} from "react";


const DeleteMemberDialog = (props) => {
    const [member, setMember] = useState(null);

    const handleClose = () => {props.setIsOpen(false)}

    const handleChange = (event) => {
        setMember(event.target.value);
    };

    const deleteMember = (userID) => {
        handleClose();
        props.delete(userID);
    }

    return(
        <Dialog
            open={props.isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Slett et medlem?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Dette vil fjerne tilgangen til beitelaget for den valgte personen.
                </DialogContentText>
                <FormControl component="fieldset">
                    <RadioGroup name="member1" value={member} onChange={handleChange}>
                        {props.beitelag.beitelagMembers.items.map( member => {
                            if (member.id !== props.beitelag.id) {
                                return(
                                    <FormControlLabel
                                        key={member.id}
                                        value={member.id}
                                        control={<Radio />}
                                        label={member.nickName}
                                    />
                                );
                            }
                        })}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Tilbake
                </Button>
                <Button
                    onClick={() => deleteMember(member)}
                    disabled={member === null}
                >
                    Slett
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteMemberDialog;
