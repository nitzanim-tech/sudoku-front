import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";
import * as ExcelJS from "exceljs";

function DownloadIcon(studentsaa) {
  function taskStatus(student, task) {
    const submission = student.sumbits.find((submit) => submit.task === task);
    if (!submission) return "";
    if (submission.data.some((data) => data.pass)) return "עבר";
    return "לא עבר";
  }

  const students = [
    {
      id: "6499de57de98f77e29320520",
      instructor: "648daf8f7f7a55ee5381e4dd",
      name: "אביאל עחעיח",
      sumbits: [
        {
          task: "challenge-sudoku",
          data: [
            {
              code: "def str_to_li..",
              date: "2023-06-26T18:52:07.233Z",
              pass: true,
            },
          ],
          _id: "6499de57de98f77e29320521",
        },
        {
          task: "basic-sudoku",
          data: [
            {
              code: "def str_to_li..",
              date: "2023-03-26T18:52:07.233Z",
              pass: false,
            },
          ],
          _id: "6499de57de98f77e28320521",
        },
      ],
      _id: "6499de57de98f77e29320520",
    },
    {
      _id: "649ac10dde98f77e293206dd",
      name: "יובל גדכגכדג",
      instructor: "6484c5b0a65864b3b39057a4",
      sumbits: [Array(2)],
    },
  ];

  async function handleDownloadExcel() {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Sheet1");
    ws.views = [{ rightToLeft: true }];
    ws.addRow(["שם", "אזור", "מדריך", "משימה בסיסית", "אתגר"]);

    // Loop through the students array and add a new row for each student to the worksheet
    for (const student of students) {
      ws.addRow([
        student.name,
        student.sumbits.length,
        student.instructor,
        taskStatus(student, "basic-sudoku"),
        taskStatus(student, "challenge-sudoku"),
      ]);
    }

    // Generate a buffer from the workbook
    const buffer = await wb.xlsx.writeBuffer();

    // Create a blob from the buffer
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
