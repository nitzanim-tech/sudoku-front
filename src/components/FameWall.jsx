import React from "react";
import StudentCard from "./StudentCard";
import { Box, Grid } from "@mui/material";

const FameWall = ({ students }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {students.length >= 1 && (
        <Box sx={{ margin: 1 }}>
          <StudentCard place={1} student={students[0]} />
        </Box>
      )}

      {students.length >= 3 && (
        <Box sx={{ margin: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <StudentCard place={2} student={students[1]} />
            </Grid>
            <Grid item xs={6}>
              <StudentCard place={3} student={students[2]} />
            </Grid>
          </Grid>
        </Box>
      )}

      {students.length > 3 && (
        <Box sx={{ margin: 3, width: "600px" }}>
          <Grid rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {students.slice(3).map((student, index) => (
              <Grid item xs={12} key={index}>
                <StudentCard place={index + 4} student={student} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FameWall;
