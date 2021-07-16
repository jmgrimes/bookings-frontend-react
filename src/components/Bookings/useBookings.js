import {
    useQuery
} from "react-query";

import {
    getData
} from "../../utils/apis";
import {
    shortISO
} from "../../utils/dates";

const useBookings = (bookableId, startDate, endDate, transform = (bookings) => (bookings)) => {
    const start = shortISO(startDate);
    const end = shortISO(endDate);
    const url = `http://localhost:3001/bookings?bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const result = useQuery(
        [ "bookings", bookableId, start, end ],
        () => getData(url)
    );
    return {
        ...result,
        bookings: transform(result.data || [])
    };
}

export default useBookings;