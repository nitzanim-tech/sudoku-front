import DescriptionIcon from "@mui/icons-material/Description";
import { IconButton, TableBody, TableCell } from "@mui/material";
import { Table, TableHead, TableRow } from "@mui/material";
import { formatDate } from "../../util/formatDate";

function SubTable(props) {
  const { row, handleDownload } = props;

  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell style={{ textAlign: "center" }}>קובץ</TableCell>
          <TableCell style={{ textAlign: "center" }}>עבר</TableCell>
          <TableCell style={{ textAlign: "center" }}>תאריך</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {row.sumbits.map((submission) => (
          <TableRow key={submission.date}>
            <TableCell align="right">
              <IconButton
                onClick={() => {
                  handleDownload(submission.code, row.name);
                }}
              >
                <DescriptionIcon />
              </IconButton>
            </TableCell>
            <TableCell>{submission.pass ? "עבר" : "לא עבר"}</TableCell>
            <TableCell component="th" scope="row">
              {formatDate(submission.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SubTable;
