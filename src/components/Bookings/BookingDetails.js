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

import Booking from "./Booking";
import useUser from "../Users/useUser";

const BookingDetails = ({bookable, booking}) => {
    const [user] = useUser();
    const isBookingUser = booking && user && booking.bookerId === user.id;

    return (
        <Card>
            <CardHeader title="Booking Details" action={
                booking?.bookerId ?
                (
                    isBookingUser &&
                    <IconButton>
                        <Edit/>
                    </IconButton>
                ) :
                (
                    <IconButton>
                        <Add/>
                    </IconButton>
                )
            }/>
            <CardContent>
                {
                    booking ?
                    <Booking bookable={bookable} booking={booking}/> :
                    <Typography variant="body1" component="p">Select a booking or a booking slot.</Typography>
                }
            </CardContent>
        </Card>
    )
};

export default BookingDetails;