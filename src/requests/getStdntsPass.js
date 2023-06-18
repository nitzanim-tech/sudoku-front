const config = require("./config.json");

async function getStudentPass(task, region = null) {
  try {
    let url = config.url;
    url += `student/getPass?task=${task}`;
    if (region) {
      url += `&region=${region}`;
    }

    const response = await fetch(url, {
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
export { getStudentPass };
