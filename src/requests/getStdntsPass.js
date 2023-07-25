import config from "./config";

async function getStudentPass(tasks, region = null) {
  //let url = config.url;
  let url = 'http://localhost:3000/';
  try {
    url = `${url}student/getPass?task=${tasks.join('&&task=')}`;
    if (region) {
      url += `&region=${region}`;
    }

    const response = await fetch(url, {
      method: 'GET',
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
export { getStudentPass };
