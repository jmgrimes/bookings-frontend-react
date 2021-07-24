import {useQuery} from "react-query";

const url = "http://localhost:3001/users";
const useUsers = (options = {}) => {
    const result = useQuery(
        "users",
        () => fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `There was a problem fetching users data from the users resource endpoint (${url}).`
                    );
                }
                return response.json();
            }),
        options
    );
    return {
        ...result,
        users: result.data || []
    };
}

export default useUsers;