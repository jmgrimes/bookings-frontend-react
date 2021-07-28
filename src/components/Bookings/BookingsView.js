import {
    Grid
} from "@material-ui/core";
import {
    Suspense, 
    useState
} from "react";

import BookablesList from "../Bookables/BookablesList";
import BookingController from "./BookingController";
import BookingsGrid from "./BookingsGrid";
import Loading from "../Commons/Loading";
import WeekPicker from "./WeekPicker";
import useBookables from "../Bookables/useBookables";
import useBookingsParams from "./useBookingsParams";

const BookingsView = () => {
    const [booking, setBooking] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const {date, bookableId} = useBookingsParams();
    const {bookables} = useBookables({suspense: true});
    const bookable = bookables.find(b => b.id === bookableId) || bookables[0];

    const getUrl = id => {
        const root = `/bookings?bookableId=${id}`;
        return date ? `${root}&date=${date.toISODate()}` : root;
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <BookablesList bookables={bookables} bookable={bookable} getUrl={getUrl}/>
            </Grid>
            <Grid item xs={7}>
                <WeekPicker/>
                <Suspense fallback={<Loading jumbotron message="Loading bookings..."/>}>
                    <BookingsGrid bookable={bookable} booking={booking} setBooking={setBooking}/>
                </Suspense>
            </Grid>
            <Grid item xs={3}>
                <BookingController bookable={bookable} 
                                   booking={booking} 
                                   isEditing={isEditing} 
                                   setBooking={setBooking}
                                   setIsEditing={setIsEditing}/>
            </Grid>
        </Grid>
    );
};

export default BookingsView;