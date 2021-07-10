import { 
  Container,
  Grid
} from "@material-ui/core";
import { 
  useState 
} from "react";

import { 
  BookingsGrid, 
  BookingDetails, 
  WeekPicker,
} from ".";
import {
  useWeek
} from "./useWeek";
import {
  BookablesList
} from "../Bookables";

const BookingsPage = () => {
  const [ bookable, setBookable ] = useState();
  const [ booking, setBooking ] = useState();
  const [ week, weekDispatch ] = useWeek(new Date());

  return (
    <Container className="bookings-page" component="main" maxWidth="xl">
      <Grid container spacing={ 3 }>
        <Grid item xs={ 2 }>
          <BookablesList bookable={ bookable } setBookable= { setBookable } />
        </Grid>
        <Grid item xs={ 7 }>
          <WeekPicker weekDispatch={ weekDispatch } />
          <BookingsGrid week={ week } bookable={ bookable } 
              booking={ booking } setBooking={ setBooking } />
        </Grid>
        <Grid item xs={ 3 }>
          <BookingDetails bookable={ bookable } booking={ booking } />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingsPage;