import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, Collapse, TableRow, TableCell } from "@mui/material";
import SubTable from "./SubTable";
import { useState } from "react";
import { formatDate } from "../../util/formatDate";

function MainTable(props) {
  const { row, handleDownload } = props;
  const [open, setOpen] = useState(false);
  const hasPassed = row.sumbits.some((submission) => submission.pass);
  const latestSubmissionDate = row.sumbits.reduce(
    (maxDate, submission) =>
      new Date(submission.date) > new Date(maxDate) ? submission.date : maxDate,
    row.sumbits[0].date
  );

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

        <TableCell>{formatDate(latestSubmissionDate)}</TableCell>

        <TableCell>
          <IconButton
            onClick={() => handleDownload(row.sumbits[0].code, row.name)}
          >
            <DescriptionIcon />
          </IconButton>
        </TableCell>

        <TableCell>{hasPassed ? "עבר" : "לא עבר"}</TableCell>

        <TableCell>{row.name}</TableCell>
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
