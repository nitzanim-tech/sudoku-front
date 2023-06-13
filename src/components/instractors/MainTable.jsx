import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, Collapse, TableRow, TableCell } from "@mui/material";
import SubTable from "./SubTable";
import { useState } from "react";

function MainTable(props) {
  const { row, handleDownload } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.instructor.name}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => handleDownload(row.sumbits[0].code, row.name)}
          >
            <DescriptionIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <SubTable row={row} handleDownload={handleDownload} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default MainTable;
