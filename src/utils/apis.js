const API_STATUS_ERROR = "error";
const API_STATUS_IDLE = "idle";
const API_STATUS_LOADING = "loading";
const API_STATUS_SUCCESSFUL = "success";

const isError = (status) => (status === API_STATUS_ERROR);
const isIdle = (status) => (status === API_STATUS_IDLE);
const isLoading = (status) => (status === API_STATUS_LOADING);
const isSuccessful = (status) => (status === API_STATUS_SUCCESSFUL);

const getData = (url) => fetch(url).then((response) => {
    if (!response.ok) {
        throw new Error(
            `There was a problem fetching data from the url (${ url }).`
        );
    }
    return response.json();
});

export {
    getData,
    isError,
    isIdle,
    isLoading,
    isSuccessful
};