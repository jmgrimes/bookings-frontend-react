import useFetch from "../../utils/useFetch";

const useBookables = () => {
  const { data : bookables = [], error, status } = useFetch("http://localhost:3001/bookables");
  return { bookables, error, status };
}

export default useBookables;