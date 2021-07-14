import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";

const useUsers = () => {
    const {data: users = [], error, status} = useQuery(
        "users",
        () => getData("http://localhost:3001/users")
    );
    return {users, error, status};
}

export default useUsers;