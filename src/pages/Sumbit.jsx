import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";
import { examplecode } from "../util/exampleCode";
import logoImg from "../assets/img/logo.png";
import { OutlinedInput, InputLabel, Select, MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import "./Submit.css";

function Submit() {
  const [code, setCode] = useState(localStorage.getItem("code") || examplecode);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectError, setSelectError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedTask) {
      setSelectError(true);
      return;
    }
    setSelectError(false);
    localStorage.setItem("code", code);
    localStorage.setItem("task", selectedTask);
    navigate("/check");
  };

  return (
    <>
      <div className="central-div">
        <button onClick={handleSubmit} className="check-button">
          בדוק
        </button>
        <FormControl>
          <InputLabel htmlFor="task-select">כתבתי</InputLabel>
          <Select
            labelId="task-label"
            id="task-select"
            value={selectedTask || ""}
            onChange={(e) => setSelectedTask(e.target.value)}
            input={
              <OutlinedInput
                label="כתבתי"
                id="task-select"
                error={selectError}
              />
            }
          >
            <MenuItem key={4} value={4}>
              4x4 משימה - סודוקו
            </MenuItem>
            <MenuItem key={9} value={9}>
              9x9 אתגר - סודוקו
            </MenuItem>
          </Select>
        </FormControl>

        <img src={logoImg} alt="Logo" />
      </div>
      <div className="editor-container">
        <AceEditor
          mode="python"
          theme="chrome"
          name="code-editor"
          fontSize={16}
          value={code}
          editorProps={{ $blockScrolling: true }}
          onChange={(newValue) => setCode(newValue)}
        />
      </div>
    </>
  );
}

export default Submit;
