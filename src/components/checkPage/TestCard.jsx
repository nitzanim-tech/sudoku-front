import React, { useState, useEffect } from "react";
import { crossImg, verImg } from "../../assets/img";
import { Card, CardContent, CircularProgress, Snackbar } from "@mui/material";
import { Sudoku, CheckedSudoku } from "../../components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function TestCard({ index, outputs, isValid, loading, setIsValid, sudoku }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [tracebackMassage, setTracebackMassage] = useState("");

  function cleanTraceback(traceback) {
    let lines = traceback.split("\n");
    lines.splice(1, 2);
    return lines.join("\n");
  }
  useEffect(() => {
    if (outputs[index]) {
      setOutputData(outputs[index]);
      if (outputs[index].error) {
        let traceback = outputs[index].error;
        setTracebackMassage(cleanTraceback(traceback));
      }
    }
  }, [outputs]);

  return (
    <Card key={index} className="card">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="הועתק ללוח"
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <CardContent>
          <div className="flex">
            <div className="flex">
              {outputData && outputData.length > 0 && (
                <div className="margin">
                  <p className="gray">פלט</p>

                  {!tracebackMassage ? (
                    <CheckedSudoku
                      studentAns={outputData}
                      sudoku={sudoku}
                      onValidityChange={(valid) => {
                        setIsValid((prevIsValid) => {
                          const newIsValid = [...prevIsValid];
                          newIsValid[index] = valid;
                          return newIsValid;
                        });
                      }}
                    />
                  ) : null}
                </div>
              )}
              <div
                className="traceback-massage"
                style={{ maxWidth: sudoku.length === 4 ? "180px" : "400px" }}
                dangerouslySetInnerHTML={{
                  __html: tracebackMassage.replace(/\n/g, "<br>"),
                }}
              />
            </div>

            <div className="margin">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <p className="gray" style={{ marginLeft: "auto" }}>
                  טסט
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(sudoku).replace(/\bnull\b/g, "None")
                    );
                    setSnackbarOpen(true);
                  }}>
                  <ContentCopyIcon />
                </button>
              </div>

              <Sudoku board={sudoku} />
            </div>

            <div className="margin">
              <img
                src={isValid[index] ? verImg : crossImg}
                className="feedback-image"
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
export default TestCard;
