import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";

const useUsers = (transform = ((users) => (users))) => {
    const result = useQuery(
        "users",
        () => getData("http://localhost:3001/users")
    );
    return {
        ...result,
        users: transform(result.data || [])
    };
}

export default useUsers;