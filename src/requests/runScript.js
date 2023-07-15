import config from "./config";

async function runScript({ script, inputs }) {
  let response;
  try {
    response = await fetch(`http://192.168.61.42:5000/runCode`, {
      method: 'POST',
      headers: config.header,
      body: JSON.stringify({ script, inputs }),
    });

    if (response.ok) {
      let data = await response.json();
      if (data.outputs) {
        return {
          outputs: data.outputs.map((output) =>
            output.includes('Traceback')
              ? { error: output }
              : JSON.parse(output.replace(/\bNone\b/g, 'null')),
          ),
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return { error: err };
  }
}
export { runScript };
