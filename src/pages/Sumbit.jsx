import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";

function Submit() {
  const [code, setCode] = useState(
    '# Write your code here...\na=input("hi")\nprint(a)'
  );
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/check", { state: { code } });
  };

  return (
    <div className="editor">
      <AceEditor
        mode="python"
        theme="chrome"
        name="code-editor"
        fontSize={16}
        value={code}
        editorProps={{ $blockScrolling: true }}
        onChange={(newValue) => setCode(newValue)}
      />

      <button onClick={handleSubmit}>הגש</button>
    </div>
  );
}

export default Submit;
