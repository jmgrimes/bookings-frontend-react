import {
    DateTime
} from "luxon";
import {
    useMutation,
    useQueryClient
} from "react-query";

const baseUrl = "http://localhost:3001/bookings";
const useUpdateBooking = (bookableId, date, onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const url = `${baseUrl}/${data.id}`
            const fetchOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            };
            return fetch(url, fetchOptions)
                .then(response => {
                if (!response.ok) {
                    throw new Error("There was a problem updating the booking!");
                }
                return response.json();
            });
        },
        {
            onSuccess: booking => {
                const dateTime = DateTime.fromISO(date);
                const weekStart = dateTime.startOf("week").toISODate();
                const weekEnd = dateTime.endOf("week").toISODate();
                const bookingsKey = ["bookings", bookableId, weekStart, weekEnd];
                queryClient.setQueryData(bookingsKey, bookings => {
                    const bookingIndex = bookings.findIndex(b => b.id === booking.id);
                    if (bookingIndex !== -1) {
                        bookings[bookingIndex] = booking;
                    }
                    return bookings;
                })
                onSuccess(booking);
            }
        }
    );
    return {
        ...mutation,
        updateBooking: mutation.mutate
    };
}

export default useUpdateBooking;