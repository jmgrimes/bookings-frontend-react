import {useQuery} from "react-query";

const url = "http://localhost:3001/bookables";
const useBookables = (options = {}) => {
    const result = useQuery(
        "bookables",
        () => fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `There was a problem fetching bookables data from the bookables resource endpoint (${url}).`
                    );
                }
                return response.json();
            }),
        options
    );
    return {
        ...result,
        bookables: result.data || []
    };
}

export default useBookables;