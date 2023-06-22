import React from "react";

function Guidelines() {
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = `https://drive.google.com/file/d/1472x6KrjCxrpTSDjXYtfkN_WDaLrVHo3/view?usp=sharing`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto", textAlign: "center" }}>
      <h1>משימה/אתגר קיץ</h1>
      <p>
        חניכים יקרים, כבר יצאתם לחופש וכבר אנחנו מתגעגעים. <br />
        באתר זה תוכלו להגיש את משימת הקיץ.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src="/src/assets/img/drive.png"
            alt="Google Drive Icon"
            onClick={() => handleDownload("basic")}
            className="drive-image"
          />
          <h4>9X9 אתגר</h4>
        </div>
        <div style={{ textAlign: "center" }}>
          <img
            src="/src/assets/img/drive.png"
            alt="Google Drive Icon"
            onClick={() => handleDownload("challenge")}
            className="drive-image"
          />
          <h4>4X4 משימה</h4>
        </div>
      </div>
      <p>
        :לכל שאלה, צוות פיתוח שנה א' זמינים במייל
        <br />
        devteam.a@nitzanim.tech
        <br />
        <b>!בהצלחה</b>
      </p>
    </div>
  );
}

export default Guidelines;
