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
          <TableCell>תאריך</TableCell>
          <TableCell>עבר</TableCell>
          <TableCell>קובץ</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {row.sumbits.map((submission) => (
          <TableRow key={submission.date}>
            <TableCell component="th" scope="row">
              {formatDate(submission.date)}
            </TableCell>

            <TableCell>{submission.pass ? "Yes" : "No"}</TableCell>

            <TableCell align="right">
              <IconButton
                onClick={() => {
                  handleDownload(submission.code, row.name);
                }}
              >
                <DescriptionIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SubTable;
