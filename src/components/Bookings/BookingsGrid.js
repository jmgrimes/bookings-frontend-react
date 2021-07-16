import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Fragment,
    useEffect
} from "react";

import {
    getWeek,
    shortISO
} from "../../utils/dates";

import useBookings from "./useBookings";
import useBookingsParams from "./useBookingsParams";
import useGrid from "./useGrid";

const transformBookings = (bookingsArray) => {
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
        background: theme.palette.primary.dark
    },
    booking: {
        color: theme.palette.grey.A900,
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

    const {date} = useBookingsParams();
    const week = getWeek(date);
    const weekStart = shortISO(week.start);

    const {bookings, error, isError, isLoading, isSuccess} = useBookings(
        bookable?.id, week.start, week.end, transformBookings
    );

    const {grid, sessions, dates} = useGrid(bookable, week.start);

    useEffect(
        () => {
            setBooking(null);
        },
        [bookable, weekStart, setBooking]
    );

    const cell = (session, date) => {
        const cellData = bookings?.[session]?.[date] || grid[session][date];
        const isSelected = booking?.session === session && booking?.date === date;
        return (
            <TableCell variant="body" align="center"
                       className={isSelected ? classes.bookingSelected : classes.booking}
                       onClick={isSuccess ? () => setBooking(cellData) : null}
                       key={`${session}-${date}-cell`}>
                {cellData.title}
            </TableCell>
        )
    }

    if (!grid) {
        return <Typography variant="body1" component="p">Loading...</Typography>
    }

    return (
        <Fragment>
            {
                isError &&
                <Typography variant="body1" component="p">${error.message}</Typography>
            }
            <Table>
                <TableHead>
                    <TableRow key="header">
                        <TableCell align="center" className={classes.header} key="progress">
                            {
                                isLoading &&
                                <CircularProgress/>
                            }
                        </TableCell>
                        {
                            dates.map((date) => (
                                <TableCell align="center" className={classes.header} key={`${date}-header`}>
                                    {new Date(date).toDateString()}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sessions.map((session) => (
                            <TableRow key={`${session}-row`}>
                                <TableCell align="center" className={classes.header} key={`${session}-header`}>
                                    {session}
                                </TableCell>
                                {dates.map((date) => cell(session, date))}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Fragment>
    )
};

export default BookingsGrid;