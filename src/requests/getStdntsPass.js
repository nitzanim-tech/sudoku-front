import config from "./config";

async function getStudentPass(task, region = null) {
  let url = config.url;

  try {
    url = `${url}student/getPass?task=${task}`;
    if (region) {
      url += `&region=${region}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: config.header,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);

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
