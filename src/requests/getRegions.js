const config = require("./config.json");

async function getRegions() {
  const url = config.url;

  try {
    const response = await fetch(`${url}region/get`, {
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
export { getRegions };
