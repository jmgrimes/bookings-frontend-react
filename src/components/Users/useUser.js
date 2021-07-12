import useFetch from "../../utils/useFetch";

const useUser = (userId) => {
  const { data : user, error, status } = useFetch(`http://localhost:3001/users/${ userId }`);
  return { user, error, status };
}

export default useUser;