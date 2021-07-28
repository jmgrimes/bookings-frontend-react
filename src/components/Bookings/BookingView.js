import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Add,
    Edit
} from "@material-ui/icons";
import {
    DateTime
} from "luxon";

import useUser from "../Users/useUser";

const useStyles = makeStyles(() => ({
    field: {
        marginBottom: 10,
        "& label": {
            fontWeight: "bold"
        }
    }
}));

const Booking = ({bookable, booking}) => {
    const classes = useStyles();
    const {title, date, session, notes} = booking;
    return (
        <>
            <div className={classes.field}>
                <Typography variant="body1" component="label">Bookable</Typography>
                <Typography variant="body1" component="p">{bookable.title}</Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="body1" component="label">Booking Date</Typography>
                <Typography variant="body1" component="p">
                    {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </Typography>
            </div>
            <div className={classes.field}>
                <Typography variant="body1" component="label">Session</Typography>
                <Typography variant="body1" component="p">{session}</Typography>
            </div>
            {
                title &&
                <div className={classes.field}>
                    <Typography variant="body1" component="label">Title</Typography>
                    <Typography variant="body1" component="p">{title}</Typography>
                </div>
            }
            {
                notes &&
                <div className={classes.field}>
                    <Typography variant="body1" component="label">Notes</Typography>
                    <Typography variant="body1" component="p">{notes}</Typography>
                </div>
            }
        </>
    );
};

const BookingView = ({bookable, booking, onEdit}) => {
    const [user] = useUser();
    const isBookingUser = booking && user && booking.bookerId === user.id;
    return (
        <Card>
            <CardHeader title="Booking Details" action={
                booking?.bookerId ?
                (
                    isBookingUser &&
                    <IconButton onClick={onEdit}>
                        <Edit/>
                    </IconButton>
                ) :
                (
                    booking &&
                    <IconButton onClick={onEdit}>
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
    );
};

export default BookingView;