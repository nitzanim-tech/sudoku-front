import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";
import { examplecode } from "../util/exampleCode";
import logoImg from "../assets/img/logo.png";
import { OutlinedInput, InputLabel, Select, MenuItem } from "@mui/material";

function Submit() {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("code", code);
    localStorage.setItem("task", selectedTask);
    navigate("/check");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60vw",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: "#008AD1", color: "white" }}
        >
          בדוק
        </button>

        <InputLabel htmlFor="task-select">כתבתי</InputLabel>
        <Select
          labelId="task-label"
          id="task-select"
          value={selectedTask || ""}
          onChange={(e) => setSelectedTask(e.target.value)}
          input={<OutlinedInput label="כתבתי" id="task-select" />}
        >
          <MenuItem key={4} value={4}>
            משימה - סודוקו 4X4
          </MenuItem>
          <MenuItem key={9} value={9}>
            אתגר - סודוקו 9X9
          </MenuItem>
        </Select>

        <img src={logoImg} alt="Logo" />
      </div>
      <div
        style={{
          backgroundColor: "#003061",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AceEditor
          mode="python"
          theme="chrome"
          name="code-editor"
          fontSize={16}
          value={code}
          editorProps={{ $blockScrolling: true }}
          onChange={(newValue) => setCode(newValue)}
          width="800px"
          height="450px"
        />
      </div>
    </>
  );
}

export default Submit;

