import { 
  Grid
} from "@material-ui/core";
import { 
  useReducer, 
  useState 
} from "react";

import { 
  BookingsGrid, 
  BookingDetails, 
  WeekPicker,
  WeekState
} from ".";

import { BookablesList } from "../Bookables";


const Bookings = () => {
  const [ bookable, setBookable ] = useState();
  const [ booking, setBooking ] = useState();
  const [ week, dispatch ] = useReducer(WeekState.reducer, new Date(), WeekState.initializer);

  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 2 }>
        <BookablesList bookable={ bookable } setBookable= { setBookable } />
      </Grid>
      <Grid item xs={ 7 }>
        <WeekPicker dispatch={ dispatch } />
        <BookingsGrid week={ week } bookable={ bookable } booking={ booking } setBooking={ setBooking } />
      </Grid>
      <Grid item xs={ 3 }>
        <BookingDetails bookable={ bookable } booking={ booking } />
      </Grid>
    </Grid>
  );
};

export default Bookings;