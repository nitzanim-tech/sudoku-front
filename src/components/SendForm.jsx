import React, { useState } from "react";
import { Card, FormControl, Grid, TextField } from "@mui/material";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [noNameMassage, setNoNameMassage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentName) {
      setNoNameMassage("יש לכתוב שם");
      return;
    }

    const success = await postStudent({
      studentName,
      selectedInst,
      pass,
    });
    if (!success) {
      setErrorMessage("An error occurred while submitting the form.");
    } else {
      setSent(true);
    }
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
                error={noNameMassage}
                helperText={noNameMassage}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={7}>
            <SelectInst
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedInst={selectedInst}
              setSelectedInst={setSelectedInst}
            />
          </Grid>
        </Grid>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Card>
  );
};

export default SendForm;
