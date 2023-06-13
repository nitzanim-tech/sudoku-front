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
          <TableCell align="center">קובץ</TableCell>
          <TableCell align="center">טסטים</TableCell>
          <TableCell align="center">תאריך</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {row.sumbits.map((submission) => (
          <TableRow key={submission.date} align="center">
            <TableCell align="center">
              <IconButton
                onClick={() => {
                  handleDownload(submission.code, row.name);
                }}
              >
                <DescriptionIcon />
              </IconButton>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: submission.pass ? "green" : "red" }}
            >
              {submission.pass ? "עבר" : "לא עבר"}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {formatDate(submission.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SubTable;
