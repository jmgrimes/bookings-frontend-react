import {
    useQuery
} from "react-query";

const baseUrl = "http://localhost:3001/bookings";
const useBookings = (bookableId, startDate, endDate, options = {}) => {
    const start = startDate.toISODate();
    const end = endDate.toISODate();
    const url = `${baseUrl}?bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const result = useQuery(
        ["bookings", bookableId, start, end],
        () => fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `There was a problem fetching bookings data from the bookings resource endpoint (${url}).`
                    );
                }
                return response.json();
            }),
        options
    );
    return {
        ...result,
        bookings: result.data || []
    };
}

export default useBookings;