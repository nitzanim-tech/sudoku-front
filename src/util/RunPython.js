import { spawn } from "child_process";

function runPython(scriptPath, args) {
  const pythonProcess = spawn("python", [scriptPath, ...args]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });
}
export { runPython };
