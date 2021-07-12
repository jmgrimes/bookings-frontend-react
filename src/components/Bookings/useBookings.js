import { shortISO } from "../../utils/dates";
import useFetch from "../../utils/useFetch";

const useBookings = (bookableId, startDate, endDate) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = "http://localhost:3001/bookings";
  const query = `bookableId=${ bookableId }&date_gte=${ start }&date_lte=${ end }`;
  const { data : bookings = [], error, status } = useFetch(`${ urlRoot }?${ query }`);
  return { bookings, error, status };
}

export default useBookings;