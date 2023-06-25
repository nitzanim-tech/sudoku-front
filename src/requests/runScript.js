import config from "./config";

async function runScript({ script, input }) {
  let response;
  try {
    response = await fetch(`https://python-api.up.railway.app/runCode`, {
      method: "POST",
      headers: config.header,
      body: JSON.stringify({ script, input }),
    });

    if (response.ok) {
      let data = await response.json();
      if (data.output.includes("Traceback")) {
        return { error: data.output };
      } else {
        return JSON.parse(data.output.replace(/\bNone\b/g, "null"));
      }
    } else {
      return null;
    }
  } catch (err) {
    return { error: err };
  }
}
export { runScript };
