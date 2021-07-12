import useFetch from "../../utils/api";

const useBookable = (bookableId) => {
  const { data : bookable , error, status } = useFetch(`http://localhost:3001/bookables/${ bookableId }`);
  return { bookable, error, status };
}

export default useBookable;