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
  useEffect, 
  useMemo, 
  useState 
} from "react";

import { 
  getBookings 
} from "../../utils/api";
import { 
  addDays, 
  shortISO 
} from "../../utils/date-wrangler";
import { 
  sessions as sessionNames 
} from "../../static.json";

const getGrid = (bookable, startDate) => {
  const dates = bookable.days.sort().map((day) => shortISO(addDays(startDate, day)));
  const sessions = bookable.sessions.map((session) => sessionNames[session]);
  const grid = {};
  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach((date) => {
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
  const [ bookings, setBookings ] = useState();
  const [ error, setError ] = useState(false);
  const { grid, sessions, dates } = useMemo(
    () => bookable ? getGrid(bookable, week.start) : { },
    [ bookable, week.start ]
  );

  const cell = (session, date) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;
    return (
      <TableCell variant="body" align="center"
          className={ isSelected ? classes.bookingSelected : classes.booking } 
          onClick={ bookings ? () => setBooking(cellData) : null }
          key={ date }>
        {cellData.title}
      </TableCell>
    )
  }

  useEffect(
    () => {
      if (bookable) {
        let doUpdate = true;
        setBookings(null);
        setBooking(null);
        setError(false);
        getBookings(bookable.id, week.start, week.end)
            .then((bookings) => {
              if (doUpdate) {
                setBookings(transformBookings(bookings));
              }
            })
            .catch(setError);
        return () => {
          doUpdate = false;
        };
      }
    },
    [ week, bookable, setBooking ]
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