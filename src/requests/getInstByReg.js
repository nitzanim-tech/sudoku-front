async function getInsByReg({ regionId }) {
  try {
    const response = await fetch(
      `http://localhost:3000/region/getInst/${regionId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);

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
export { getInsByReg };
