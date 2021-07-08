export default getData = (url) => {
  return fetch(url).then(response => {
    if (!response.ok) {
        throw new Error("There was a problem fetching data from the server.");
    }
    return response.json();
  });
};