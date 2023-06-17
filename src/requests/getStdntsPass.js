async function getStudentPass(task) {
  try {
    const response = await fetch(
      `http://localhost:3000/student/getPass?task=${task}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

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
export { getStudentPass };
