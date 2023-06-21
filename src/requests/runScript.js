import config from "./config";

async function runScript({ script, input }) {
  try {
    const response = await fetch(
      `https://python-api.up.railway.app/runCode`,
      {
        method: "POST",
        headers: config.header,
        body: JSON.stringify({ script, input }),
      }
    );

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      return JSON.parse(data.output);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
export { runScript };

