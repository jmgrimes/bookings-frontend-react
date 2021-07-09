import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography 
} from "@material-ui/core";

import { Booking } from ".";

const BookingDetails = ({ bookable, booking }) => {
  return (
    <Card>
      <CardHeader title="Booking Details" />
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