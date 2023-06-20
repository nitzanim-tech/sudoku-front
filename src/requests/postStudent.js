import config from "./config";

async function postStudent({ studentName, selectedInst, pass }) {
  const code = localStorage.getItem("code") || "print('empty')";
  const taskValue = parseInt(localStorage.getItem("task"));

  let task;
  if (taskValue === 4) {
    task = "basic-sudoku";
  } else if (taskValue === 9) {
    task = "challenge-sudoku";
  }

  try {
    const response = await fetch("/student/add", {
      method: "POST",
      headers: config.header,
      body: JSON.stringify({
        name: studentName,
        instructor: selectedInst,
        code: code,
        pass: pass,
        task: task,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
export { postStudent };
