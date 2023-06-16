import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DialogContent, Button } from "@mui/material";
import { DialogContentText } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onAgree }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle dir="rtl">הצהרה</DialogTitle>
      <DialogContent>
        <DialogContentText dir="rtl">
          הִנְני נשבּע וּמתחייב בְּהן צִדקי לשמור אֱמוּנים לִמדינת ישראל לחוקֶיה
          וּלשלטונותֶיה המוסמכים לקבל על עצמי ללא תנאי וּללא סְיָיג עוֹל מִשמעתו
          של צְבא הַהֲגנה לישראל לציית לכֿל הפקודות וההוראות הניתנות על ידי
          המפקדים המוסמכים וּלהקדיש את כל כוחותיי ואף להקריב את חַיַּי לַהֲגנת
          המולדת וּלחירות ישראל
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={onAgree}>אני נשבע</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
