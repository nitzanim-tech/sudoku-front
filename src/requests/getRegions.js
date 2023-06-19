import config from "./config";

async function getRegions() {
  const url = config.url;

  try {
    const response = await fetch(`${url}region/get`, {
      method: "GET",
      headers: config.header,
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
