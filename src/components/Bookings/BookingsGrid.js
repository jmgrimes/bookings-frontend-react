import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    makeStyles
} from "@material-ui/core";
import {
    Skeleton
} from "@material-ui/lab"
import {DateTime} from "luxon";
import React from "react";

import useBookingsParams from "./useBookingsParams";
import {Error} from "../Commons";
import {sessions as sessionNames} from "../../static.json";
import {useBookings} from "../../apis/Bookings";

const gridFrom = (bookable, startDate) => {
    const dates = bookable.days.sort().map(day => startDate.plus({ days: day }).toISODate());
    const sessions = bookable.sessions.map(session => sessionNames[session]);
    const grid = {};
    sessions.forEach(session => {
        grid[session] = {};
        dates.forEach(date => {
            grid[session][date] = {
                session,
                date,
                bookableId: bookable.id,
                title: ""
            };
        });
    });
    return {
        grid,
        dates,
        sessions
    };
};

const transform = bookingsArray => {
    return (
        bookingsArray ?
            bookingsArray.reduce(
                (bookings, booking) => {
                    const {session, date} = booking;
                    if (!bookings[session]) {
                        bookings[session] = {};
                    }
                    bookings[session][date] = booking;
                    return bookings;
                },
                {}
            ) :
            {}
    );
}

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.dark,
        height: 55,
        fontWeight: "bold"
    },
    booking: {
        color: theme.palette.grey.A700,
        "&:hover": {
            background: theme.palette.grey.A100
        }
    },
    bookingSelected: {
        color: theme.palette.secondary.contrastText,
        background: theme.palette.secondary.light
    }
}));

const BookingsGrid = ({bookable, booking, setBooking}) => {
    const classes = useStyles();
    const {week} = useBookingsParams();
    const {grid, sessions, dates} = gridFrom(bookable, week.start);
    const {bookings: bookingsArray, error, isError, isLoading, isSuccess} = useBookings(
        bookable.id, week.start, week.end
    );

    const bookings = transform(bookingsArray);
    const weekStart = week.start.toISODate();

    React.useEffect(
        () => {
            setBooking(null);
        },
        [bookable, weekStart, setBooking]
    );

    const BookingCell = ({session, date}) => {
        const cellData = bookings?.[session]?.[date] || grid[session][date];
        const isSelected = booking?.session === session && booking?.date === date;
        return (
            <TableCell variant="body"
                       align="center"
                       key={`${session}-${date}-booking-cell`}
                       className={isSelected ? classes.bookingSelected : classes.booking}
                       onClick={isSuccess ? () => setBooking(cellData) : null}>
                {isLoading ? <Skeleton variant="text" animation="wave"/> : cellData.title}
            </TableCell>
        );
    };

    return (
        <>
            {isError && <Error error={error}/>}
            <Table>
                <TableHead>
                    <TableRow key="header">
                        <TableCell align="center" valign="center" className={classes.header} key="nexus"/>
                        {
                            dates.map(date =>
                                <TableCell align="center" className={classes.header} key={`${date}-header`}>
                                    {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sessions.map(session =>
                            <TableRow key={`${session}-row`}>
                                <TableCell align="center" className={classes.header} key={`${session}-header`}>
                                    {session}
                                </TableCell>
                                {
                                    dates.map(date =>
                                        <BookingCell key={`${session}-${date}-booking`}
                                                     session={session}
                                                     date={date}/>
                                    )
                                }
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    );
};

export default BookingsGrid;