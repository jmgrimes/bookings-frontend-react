import { 
    useEffect 
} from "react";

import BookingForm from "./BookingForm";
import BookingView from "./BookingView";
import Error from "../Commons/Error";
import Loading from "../Commons/Loading";
import useCreateBooking from "./useCreateBooking";
import useDeleteBooking from "./useDeleteBooking";
import useUpdateBooking from "./useUpdateBooking";
import useUser from "../Users/useUser";

const BookingController = ({bookable, booking, isEditing, setBooking, setIsEditing}) => {
    const [user] = useUser();

    const {
        createBooking, 
        error: createError, 
        isError: isCreateError, 
        isLoading: isCreating
    } = useCreateBooking(bookable.id, booking?.date, booking => {
        setIsEditing(false);
        setBooking(booking);
    });
    const {
        updateBooking,
        error: updateError,
        isError: isUpdateError,
        isLoading: isUpdating
    } = useUpdateBooking(bookable.id, booking?.date, booking => {
        setIsEditing(false);
        setBooking(booking);
    });
    const {
        deleteBooking,
        error: deleteError,
        isError: isDeleteError,
        isLoading: isDeleting
    } = useDeleteBooking(bookable.id, booking?.date, () => {
        setIsEditing(false);
        setBooking(undefined);
    });

    useEffect(
        () => setIsEditing(false),
        [bookable, booking, user, setIsEditing]
    );

    if (isCreating) return <Loading message="Creating booking..."/>;
    if (isCreateError) return <Error error={createError}/>;

    if (isUpdating) return <Loading message="Updating booking..."/>;
    if (isUpdateError) return <Error error={updateError}/>;

    if (isDeleting) return <Loading message="Deleting booking..."/>;
    if (isDeleteError) return <Error error={deleteError}/>;

    return (
        !isEditing ?
        <BookingView bookable={bookable} 
                     booking={booking} 
                     onEdit={() => setIsEditing(true)}/> :
        <BookingForm bookable={bookable} 
                     booking={booking} 
                     onCancel={() => setIsEditing(false)}
                     onDelete={booking.id ? deleteBooking : null}
                     onSave={booking.id ? updateBooking : createBooking}/>
    );
};

export default BookingController;