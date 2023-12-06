import React, { useState, useEffect } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { getRegions } from "../requests/getRegions";
import { getInsByReg } from "../requests/getInstByReg";

const SelectInst = ({
  selectedRegion,
  setSelectedRegion,
  selectedInst,
  setSelectedInst,
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

  return (
    <Grid container spacing={2} style={{ alignItems: "center" }}>
      <Grid item xs={6}>
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

      <Grid item xs={6}>
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
  );
};

export default SelectInst;
