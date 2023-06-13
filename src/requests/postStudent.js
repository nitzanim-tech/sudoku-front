async function postStudent({ studentName, selectedInst, pass }) {
  const code = localStorage.getItem("code") || "print('empty')";
  try {
    const response = await fetch("http://localhost:3000/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentName,
        instructor: selectedInst,
        code: code,
        pass: pass,
      }),
    });

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
export { postStudent };
