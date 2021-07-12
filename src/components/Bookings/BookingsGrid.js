import { 
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

import { useBookings } from ".";
import { useBookableGrid } from "../Bookables";
import { isComplete } from "../../utils/api";

const transformBookings = (bookingsArray) => {
  return bookingsArray.reduce(
    (bookings, booking) => {
      const { session, date } = booking;
      if (!bookings[session]) {
        bookings[session] = {};
      }
      bookings[session][date] = booking;
      return bookings;
    },
    { }
  );
}

const useStyles = makeStyles(theme => ({
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

const BookingsGrid = ({ week, bookable, booking, setBooking }) => {
  const classes = useStyles();
  const { grid, sessions, dates } = useBookableGrid(bookable, week.start);
  const { bookings : bookingsArray, error, status } = useBookings(bookable?.id, week.start, week.end);

  const bookings = bookingsArray ? transformBookings(bookingsArray) : { }; 

  const cell = (session, date) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;
    return (
      <TableCell variant="body" align="center"
          className={ isSelected ? classes.bookingSelected : classes.booking } 
          onClick={ isComplete(status) ? () => setBooking(cellData) : null }
          key={ date }>
        {cellData.title}
      </TableCell>
    )
  }

  useEffect(
    () => {
      setBooking(null);
    },
    [ bookable, week.start, setBooking ]
  );

  if (!grid) {
    return <Typography variant="body1" component="p">Loading...</Typography>
  }

  return (
    <Fragment>
      { 
        error &&
        <Typography variant="body1" component="p">
          {`There was a problem loading the bookings data (${error}).`}
        </Typography>
      }
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={ classes.header }>

            </TableCell>
            { 
              dates.map((date) => (
                <TableCell align="center" className={ classes.header }>
                  {new Date(date).toDateString()}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sessions.map((session) => (
              <TableRow>
                <TableCell align="center" className={ classes.header }>{ session }</TableCell>
                { dates.map((date) => cell(session, date)) }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Fragment>
  )
};

export default BookingsGrid;