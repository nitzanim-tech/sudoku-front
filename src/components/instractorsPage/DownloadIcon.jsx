import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";
import * as ExcelJS from "exceljs";
import { getInst } from "../../requests/getInst";
function DownloadIcon(students) {
  function taskStatus(student, task) {
    const submission = student.sumbits.find((submit) => submit.task === task);
    if (!submission) return "";
    if (submission.data.some((data) => data.pass)) return "עבר";
    return "לא עבר";
  }

  async function handleDownloadExcel() {
    const InstNamesAndRegions = await getInst();
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Sheet1");
    ws.views = [{ rightToLeft: true }];
    ws.addRow(["שם", "אזור", "מדריך", "משימה בסיסית", "אתגר"]);

    for (const student of students.students) {
      const instructor = InstNamesAndRegions.find(
        (inst) => inst.id === student.instructor
      );
      ws.addRow([
        student.name,
        instructor.region,
        instructor.name,
        taskStatus(student, "basic-sudoku"),
        taskStatus(student, "challenge-sudoku"),
      ]);
    }

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "students.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <IconButton onClick={() => handleDownloadExcel()}>
        <FileDownloadIcon />
      </IconButton>
    </>
  );
}

export default DownloadIcon;
