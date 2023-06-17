import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DialogContent, Button } from "@mui/material";
import { DialogContentText } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onAgree }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle dir="rtl">הצהרה</DialogTitle>
      <DialogContent>
        <DialogContentText dir="rtl">
          אני מתחייב/ת שהקוד שאגיש הוא פעולת ידי ושאשתמש באתר זה למטרות לימוד
          בלבד, תוך שמירה על הכללים ובכוונה לא לפגוע בו. <br />
          מובן לי שעמידה בכללים אלו הכרחית להמשך השתתפותי בתוכנית.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={onAgree}>מאשר/ת</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
