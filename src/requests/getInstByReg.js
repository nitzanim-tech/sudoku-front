const config = require("./config.json")
async function getInsByReg({ regionId }) {
  const url = config.url;
  try {
    const response = await fetch(`${url}region/getInst/${regionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
export { getInsByReg };
