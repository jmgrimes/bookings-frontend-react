import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";

const useBookables = (transform = ((bookables) => (bookables))) => {
    const result = useQuery(
        "bookables",
        () => getData("http://localhost:3001/bookables")
    );
    return {
        ...result,
        bookables: transform(result.data || [])
    };
}

export default useBookables;