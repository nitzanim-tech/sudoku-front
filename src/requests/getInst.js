import config from "./config";

async function getInst() {
  const url = config.url;
  try {
    const response = await fetch(`${url}inst/get`, {
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
export { getInst };
