import { 
  useSearchParams
} from "react-router-dom";

import {
  isDate
} from "../../utils/dates";

const useBookingsParams = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const dateParam = searchParams.get("date");
  const date = isDate(dateParam) ? new Date(dateParam) : new Date();

  const bookableIdParam = parseInt(searchParams.get("bookableId"), 10);
  const bookableId = !isNaN(bookableIdParam) ? bookableIdParam : undefined;

  const setBookingsDate = (date) => {
    const params = { };
    if (bookableId) {
      params.bookableId = bookableId;
    }
    if (isDate(date)) {
      params.date = date;
    }
    if (params.date || params.bookableId !== undefined) {
      setSearchParams(params, { replace: true });
    }
  }

  return {
    date, 
    bookableId,
    setBookingsDate
  };
};

export default useBookingsParams;