import {
  useEffect,
  useState
} from "react";

const API_STATUS_DONE = "done";
const API_STATUS_ERROR = "error";
const API_STATUS_IDLE = "idle";
const API_STATUS_LOADING = "loading";

const isComplete = (status) => (status === API_STATUS_DONE);
const isError = (status) => (status === API_STATUS_ERROR);
const isIdle = (status) => (status === API_STATUS_IDLE);
const isLoading = (status) => (status === API_STATUS_LOADING);

const useFetch = (url) => {
  const [ data, setData ] = useState();
  const [ error, setError ] = useState(null);
  const [ status, setStatus ] = useState(API_STATUS_IDLE);

  useEffect(
    () => {
      let doUpdate = true;
      setStatus(API_STATUS_LOADING);
      setData(undefined);
      setError(null);
      fetch(url)
          .then((response) => {
            if (!response.ok) {
                throw new Error(
                  `There was a problem fetching data from the url (${ url }).`
                );
            }
            return response.json();
          })
          .then((data) => {
            if (doUpdate) {
              setData(data);
              setStatus(API_STATUS_DONE);
            }
          })
          .catch((error) => {
            if (doUpdate) {
              setError(error);
              setStatus(API_STATUS_ERROR);
            }
          });
      return () => (doUpdate = false);
    },
    [ url ]
  );

  return { data, error, status };
}

export {
  isComplete,
  isError,
  isIdle,
  isLoading
};
export default useFetch;