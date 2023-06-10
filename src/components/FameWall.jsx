import React from "react";
import StudentCard from "./StudentCard";
const FameWall = () => {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div style={{ gridColumnEnd: "span 1" }}>
          <StudentCard place={1} student={0} />
        </div>
        <div style={{ gridColumnEnd: "span 1" }}>
          <StudentCard place={2} student={0} />
        </div>
        <div style={{ gridColumnEnd: "span 1" }}>
          <StudentCard place={3} student={0} />
        </div>
        <StudentCard place={4} student={0} />
        <StudentCard place={5} student={0} />
        <StudentCard place={6} student={0} />
        <StudentCard place={7} student={0} />
      </div>
    </>
  );
};

export default FameWall;
