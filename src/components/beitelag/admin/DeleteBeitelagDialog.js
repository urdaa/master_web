import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";


const DeleteBeitelagDialog = (props) => {

    const handleClose = () => {props.setIsOpen(false)}

    return(
      <Dialog
          open={props.isOpen}
          onClose={handleClose}
      >
          <DialogTitle>Slette beitelaget?</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Hvis du godtar vil du slette beitelaget, medlemmer og medlemsforespørsler. Dette kan ikke reverseres.
                  Det vil ikke slette turene medlemmer har lastet opp.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>
                  Nei
              </Button>
              <Button onClick={() => props.delete()}>
                  Ja
              </Button>
          </DialogActions>
      </Dialog>
    );
}

export default DeleteBeitelagDialog;
