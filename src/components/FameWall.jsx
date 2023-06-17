import React from "react";
import StudentCard from "./StudentCard";
import { Box, Grid, CircularProgress } from "@mui/material";

const FameWall = ({ students }) => {
  if (!students) {
    return <CircularProgress />;
  }

  const numColumns = 3;

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

      {students.length == 2 && (
        <Box sx={{ margin: 3 }}>
          <Box sx={{ margin: 1 }}>
            <StudentCard place={2} student={students[1]} />
          </Box>
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
              <StudentCard place={3} student={students[2]} />
            </Grid>
            <Grid item xs={6}>
              <StudentCard place={2} student={students[1]} />
            </Grid>
          </Grid>
        </Box>
      )}

      {students.length > 3 && (
        <Box sx={{ margin: 3, width: "600px" }}>
          <Box sx={{ direction: "rtl" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {students.slice(3).map((student, index) => {
                const place =
                  Math.floor(index / numColumns) * numColumns +
                  (numColumns - 1 - (index % numColumns)) +
                  4;
                return (
                  <Grid item xs={12 / numColumns} key={index}>
                    <StudentCard place={place} student={student} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FameWall;
