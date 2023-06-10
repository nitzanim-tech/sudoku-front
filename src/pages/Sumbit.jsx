import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";

import { examplecode } from "../util/exampleCode";
import logoImg from "../assets/img/logo.png";

function Submit() {
  const [code, setCode] = useState(examplecode);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/check", { state: { code } });
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

