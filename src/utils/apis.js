const getData = (url) => fetch(url).then((response) => {
    if (!response.ok) {
        throw new Error(
            `There was a problem fetching data from the url (${ url }).`
        );
    }
    return response.json();
});

export {
    getData
};