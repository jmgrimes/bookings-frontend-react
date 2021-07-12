import useFetch from "../../utils/useFetch";

const useUsers = () => {
  const { data : users = [], error, status } = useFetch("http://localhost:3001/users");
  return { users, error, status };
}

export default useUsers;