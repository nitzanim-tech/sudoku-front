import React, { useState, useEffect } from "react";
import { Card, InputLabel, MenuItem, FormControl } from "@mui/material";
import { TextField, OutlinedInput, Grid, Select } from "@mui/material";
import { postStudent } from "../requests/postStudent";
import SelectInst from "./SelectInst";

const SendForm = ({
  studentName,
  setStudentName,
  selectedRegion,
  setSelectedRegion,
  selectedInst,
  setSelectedInst,
  pass,
  setSent,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = localStorage.getItem("code") || "print('empty')";
    const data = await postStudent({
      studentName,
      selectedInst,
      code,
      pass,
    });
    setSent(true);
  };

  return (
    <Card sx={{ width: "680px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          <Grid item xs={2}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{ backgroundColor: "#008AD1", color: "white" }}
              >
                הגש
              </button>
            </div>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <TextField
                id="name"
                label="שם"
                type="search"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <SelectInst
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedInst={selectedInst}
            setSelectedInst={setSelectedInst}
          />
        </Grid>
      </form>
    </Card>
  );
};

export default SendForm;
