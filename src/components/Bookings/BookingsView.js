import {
    Grid
} from "@material-ui/core";
import React from "react";

import BookingDetails from "./BookingDetails";
import BookingsGrid from "./BookingsGrid";
import WeekPicker from "./WeekPicker";
import useBookingsParams from "./useBookingsParams";
import {BookablesList} from "../Bookables";
import {Loading} from "../Commons";
import {useBookables} from "../../apis/Bookables";

const BookingsView = () => {
    const [booking, setBooking] = React.useState();
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
                <React.Suspense fallback={<Loading jumbotron message="Loading bookings..."/>}>
                    <BookingsGrid bookable={bookable} booking={booking} setBooking={setBooking}/>
                </React.Suspense>
            </Grid>
            <Grid item xs={3}>
                <BookingDetails bookable={bookable} booking={booking}/>
            </Grid>
        </Grid>
    );
};

export default BookingsView;