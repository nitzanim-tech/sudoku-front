const config = require("./config.json");

async function runScript({ script, input }) {
  const url = config.url;

  try {
    const response = await fetch(`${url}/student/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script, input }),
    });

    if (response.ok) {
      let data = await response.json();
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
