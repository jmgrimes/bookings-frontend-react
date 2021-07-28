import {
    DateTime
} from "luxon";
import {
    useMutation,
    useQueryClient
} from "react-query";

const baseUrl = "http://localhost:3001/bookings";
const useDeleteBooking = (bookableId, date, onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const url = `${baseUrl}/${data.id}`
            const fetchOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            };
            return fetch(url, fetchOptions)
                .then(response => {
                if (!response.ok) {
                    throw new Error("There was a problem deleting the booking!");
                }
                return response.json();
            });
        },
        {
            onSuccess: (_, booking) => {
                const dateTime = DateTime.fromISO(date);
                const weekStart = dateTime.startOf("week").toISODate();
                const weekEnd = dateTime.endOf("week").toISODate();
                const bookingsKey = ["bookings", bookableId, weekStart, weekEnd];
                queryClient.setQueryData(bookingsKey, bookings => bookings.filter(b => b.id !== booking.id));
                onSuccess(booking);
            }
        }
    );
    return {
        ...mutation,
        deleteBooking: mutation.mutate
    };
}

export default useDeleteBooking;