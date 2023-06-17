import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, Collapse, TableRow, TableCell } from "@mui/material";
import SubTable from "./SubTable";
import { useState } from "react";
import { formatDate } from "../../util/formatDate";

function MainTable(props) {
  const { row, handleDownload, task } = props;
  const [open, setOpen] = useState(false);

  const submits = row.sumbits.find((submit) => submit.task === task);
  if (!submits) return null;

let code;
if (submits.data.some((submission) => submission.pass)) {
  const latestPassedSubmission = submits.data
    .filter((submission) => submission.pass)
    .reduce(
      (latest, submission) =>
        new Date(submission.date) > new Date(latest.date) ? submission : latest,
      { date: 0 }
    );
  code = latestPassedSubmission.code;
} else {
  const latestSubmission = submits.data.reduce(
    (latest, submission) =>
      new Date(submission.date) > new Date(latest.date) ? submission : latest,
    { date: 0 }
  );
  code = latestSubmission.code;
}

const hasPassed = submits.data.some((submission) => submission.pass);
const latestSubmissionDate = submits.data.reduce(
  (maxDate, submission) =>
    new Date(submission.date) > new Date(maxDate) ? submission.date : maxDate,
  submits.data[0].date
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
        <IconButton onClick={() => handleDownload(code, row.name)}>
          <DescriptionIcon />
        </IconButton>
      </TableCell>

      <TableCell>{hasPassed ? "עבר" : "לא עבר"}</TableCell>

      <TableCell>{row.name}</TableCell>
    </TableRow>

    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SubTable
            submits={submits.data}
            handleDownload={handleDownload}
            name={row.name}
          />
        </Collapse>
      </TableCell>
    </TableRow>
  </>
);
}

export default MainTable;
