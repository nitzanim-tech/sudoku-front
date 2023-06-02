const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.post("/run-script", (req, res) => {
  const script = req.body;
  const pythonProcess = spawn("python", ["-c", script]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.on("close", (code) => {
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
