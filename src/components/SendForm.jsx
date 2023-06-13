import React, { useState, useEffect } from "react";
import { Card, InputLabel, MenuItem, FormControl } from "@mui/material";
import { TextField, OutlinedInput, Grid, Select } from "@mui/material";
import { getRegions } from "../requests/getRegions";
import { getInsByReg } from "../requests/getInstByReg";
import { postStudent } from "../requests/postStudent";

const SendForm = ({
  studentName,
  setStudentName,
  selectedRegion,
  setSelectedRegion,
  selectedInst,
  setSelectedInst,
  code,
  pass,
  setSent,
}) => {
  const [regions, setRegions] = useState([]);
  const [instructors, setInstructors] = useState([]);

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
        const data = await getInsByReg({ regionId: selectedRegion });
        setInstructors(data);
      }
    };
    fetchInstructors();
  }, [selectedRegion]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
              <InputLabel htmlFor="inst-select">מדריך</InputLabel>
              <Select
                labelId="inst-label"
                id="inst-select"
                value={selectedInst || ""}
                onChange={(e) => setSelectedInst(e.target.value)}
                input={<OutlinedInput label="מדריך" id="inst-label" />}
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} style={{ marginRight: "1px" }}>
            <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
              <InputLabel htmlFor="region-select">אזור</InputLabel>
              <Select
                labelId="region-label"
                id="region-select"
                value={selectedRegion || ""}
                onChange={(e) => setSelectedRegion(e.target.value)}
                input={<OutlinedInput label="אזור" id="region-select" />}
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
