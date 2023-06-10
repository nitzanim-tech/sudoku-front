import React, { useState, useEffect } from "react";
import { Card, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { TextField, Grid } from "@mui/material";
import { getRegions } from "../requests/getRegions";
import { getInsByReg } from "../requests/getInstByReg";

const SendForm = () => {
  const [regions, setRegions] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInst, setSelectedInst] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const data = await getRegions();
      setRegions(data);
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchInstructors = async () => {
      if (selectedRegion) {
        console.log("Selected region:", selectedRegion);
        const data = await getInsByReg({ regionId: selectedRegion });
        setInstructors(data);
      }
    };
    fetchInstructors();
  }, [selectedRegion]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <Card sx={{ minWidth: 60, width: "600px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="inst-label">מדריך</InputLabel>
              <Select
                labelId="inst-label"
                id="inst-select"
                onChange={(e) => setSelectedInst(e.target.value)}
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="region-label">אזור</InputLabel>
              <Select
                labelId="region-label"
                id="region-select"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <MenuItem key={region.id} value={region.id}>
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};
export default SendForm;
