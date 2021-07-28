import {
    DateTime
} from "luxon";
import {
    useMutation,
    useQueryClient
} from "react-query";

const url = "http://localhost:3001/bookings";
const useCreateBooking = (bookableId, date, onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const fetchOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            };
            return fetch(url, fetchOptions)
                .then(response => {
                if (!response.ok) {
                    throw new Error("There was a problem creating the booking!");
                }
                return response.json();
            });
        },
        {
            onSuccess: newBooking => {
                const dateTime = DateTime.fromISO(date);
                const weekStart = dateTime.startOf("week").toISODate();
                const weekEnd = dateTime.endOf("week").toISODate();
                const bookingsKey = ["bookings", bookableId, weekStart, weekEnd];
                queryClient.setQueryData(bookingsKey, bookings => [ ...(bookings || []), newBooking]);
                onSuccess(newBooking);
            }
        }
    );
    return {
        ...mutation,
        createBooking: mutation.mutate
    };
}

export default useCreateBooking;