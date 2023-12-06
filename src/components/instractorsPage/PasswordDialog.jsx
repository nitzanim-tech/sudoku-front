import { useState } from "react";
import { Dialog, Button, OutlinedInput, IconButton } from '@mui/material';
import { DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { Alert, FormControl, InputLabel, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const PasswordDialog = ({ open, onEnter }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEnter = async () => {
    try {
      const response = await fetch('http://localhost:3000/inst/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        onEnter();
      } else {
        setErrorMessage(data.error || 'Invalid password');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)',
          }}
        />
      )}
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle style={{ textAlign: 'right', marginBottom: '16px' }}>
          יש להזין סיסמה
        </DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">ססמה</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="ססמה"
            />
          </FormControl>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          <Button onClick={handleEnter}>הכנס</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PasswordDialog;

