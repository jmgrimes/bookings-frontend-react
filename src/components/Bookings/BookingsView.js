import {
    Grid
} from "@material-ui/core";
import {
    useState
} from "react";

import {
    BookablesList
} from "../Bookables";
import {
    Error,
    Loading
} from "../Commons";
import { 
    useBookables
} from "../../apis/Bookables";

import BookingDetails from "./BookingDetails";
import BookingsGrid from "./BookingsGrid";
import WeekPicker from "./WeekPicker";
import useBookingsParams from "./useBookingsParams";

const BookingsView = () => {
    const [booking, setBooking] = useState();
    const {date, bookableId} = useBookingsParams();
    const {bookables, error, isError, isLoading} = useBookables();
    const bookable = bookables.find(b => b.id === bookableId) || bookables[0];

    const getUrl = id => {
        const root = `/bookings?bookableId=${id}`;
        return date ? `${root}&date=${date.toISODate()}` : root;
    };

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={error}/>;

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <BookablesList bookables={bookables} bookable={bookable} getUrl={getUrl}/>
            </Grid>
            <Grid item xs={7}>
                <WeekPicker/>
                <BookingsGrid bookable={bookable} booking={booking} setBooking={setBooking}/>
            </Grid>
            <Grid item xs={3}>
                <BookingDetails bookable={bookable} booking={booking}/>
            </Grid>
        </Grid>
    );
};

export default BookingsView;