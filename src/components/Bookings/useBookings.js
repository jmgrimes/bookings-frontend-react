import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";
import {
    shortISO
} from "../../utils/dates";

const useBookings = (bookableId, startDate, endDate) => {
    const start = shortISO(startDate);
    const end = shortISO(endDate);
    const url = `http://localhost:3001/bookings?bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const {data: bookings = [], error, status} = useQuery(
        [ "bookings", bookableId, start, end ],
        () => getData(url)
    );
    return {bookings, error, status};
}

export default useBookings;