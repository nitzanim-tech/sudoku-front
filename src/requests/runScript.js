import config from './config';

async function runScript({ script, inputs }) {
  let response;
  try {
    response = await fetch(`https://python-api.up.railway.app/runCode`, {
      method: 'POST',
      headers: config.header,
      body: JSON.stringify({ script, inputs }),
    });

    if (response.ok) {
      let data = await response.json();
      if (data.outputs) {
        return processOutputs(data.outputs);
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

function processOutputs(outputs) {
  return {
    outputs: outputs.map((output) =>
      !output
        ? { error: 'There is no output!' }
        : output.includes('Traceback')
        ? { error: output }
        : (() => {
            try {
              return JSON.parse(output.replace(/\bNone\b/g, 'null'));
            } catch (err) {
              return { error: 'The output is not a legal 2d list' };
            }
          })(),
    ),
  };
}

export { runScript };
