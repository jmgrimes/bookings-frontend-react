import {
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import {
    useState
} from "react";

import {
    BookablesList,
    useBookables
} from "../Bookables";
import {
    isError,
    isLoading
} from "../../utils/apis";
import {
    shortISO
} from "../../utils/dates";

import BookingDetails from "./BookingDetails";
import BookingsGrid from "./BookingsGrid";
import WeekPicker from "./WeekPicker";
import useBookingsParams from "./useBookingsParams";

const BookingsView = () => {
    const {date, bookableId} = useBookingsParams();
    const {bookables, error, status} = useBookables();
    const bookable = bookables.find((b) => (b.id === bookableId)) || bookables[0];

    const [booking, setBooking] = useState();

    const getUrl = (id) => {
        const root = `/bookings?bookableId=${id}`;
        return date ? `${root}&date=${shortISO(date)}` : root;
    }

    if (isError(status)) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p">{error.message}</Typography>
                </Grid>
            </Grid>
        );
    }

    if (isLoading(status)) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        );
    }

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