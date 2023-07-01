import { useState } from "react";
import { Dialog, Button, TextField } from "@mui/material";
import { DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { Alert } from "@mui/material";

const PasswordDialog = ({ open, onEnter }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnter = async () => {
    try {
      const response = await fetch(
        "https://suduku-back.up.railway.app/inst/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        onEnter();
      } else {
        setErrorMessage(data.error || "Invalid password");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(5px)",
          }}
        />
      )}
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle style={{ textAlign: "right", marginBottom: "16px" }}>
          יש להזין סיסמה
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="ססמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions style={{ justifyContent: "flex-start" }}>
          <Button onClick={handleEnter}>הכנס</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PasswordDialog;
