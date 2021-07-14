import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";

const useBookables = () => {
    const {data: bookables = [], error, status} = useQuery(
        "bookables",
        () => getData("http://localhost:3001/bookables")
    );
    return {bookables, error, status};
}

export default useBookables;