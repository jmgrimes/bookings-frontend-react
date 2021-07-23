import {
    useQuery
} from "react-query";

const url = "http://localhost:3001/bookables";
const useBookables = (transform = bookables => bookables) => {
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
            })
    );
    return {
        ...result,
        bookables: transform(result.data || [])
    };
}

export default useBookables;