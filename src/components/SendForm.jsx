import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

import { regions } from "../util/regions";

const SendForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setError(null);
      } else {
        setToken(null);
        setError("Invalid username or password");
      }
    } catch (err) {
      setToken(null);
      setError("An error occurred");
    }
  };
  return (
    <Box sx={{ minWidth: 60 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            id="name"
            label="שם"
            type="search"
            value={searchTerm}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="region-label">אזור</InputLabel>
          <Select
            labelId="region-label"
            id="region-select"
            onChange={(e) => setPassword(e.target.value)}
          >
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button type="submit">Login</button>
      </form>
      {token && <div>Token: {token}</div>}
      {error && <div>{error}</div>}
    </Box>
  );
};

export default SendForm;
