import { 
  Card, 
  CardContent, 
  CardHeader, 
  IconButton,
  Typography 
} from "@material-ui/core";
import {
  Add,
  Edit
} from "@material-ui/icons"

import { Booking } from ".";
import { useCurrentUser } from "../Users";

const BookingDetails = ({ bookable, booking }) => {
  const [ currentUser ] = useCurrentUser();
  const isBookingUser = booking && currentUser && (booking.bookerId === currentUser.id);

  return (
    <Card>
      <CardHeader title="Booking Details" action={
        booking?.bookerId ? 
        (
          isBookingUser &&
          <IconButton>
            <Edit />
          </IconButton> 
        ) :
        (
          <IconButton>
            <Add />
          </IconButton>
        )
      } />
      <CardContent>
        { 
          booking ?
          <Booking bookable={ bookable } booking={ booking } /> :
          <Typography variant="body1" component="p">Select a booking or a booking slot.</Typography>
        }
      </CardContent>
    </Card>
  )
};

export default BookingDetails;