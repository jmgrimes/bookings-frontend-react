import {
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    DateTime
} from "luxon";

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
            {
                title &&
                <div className={classes.field}>
                    <Typography variant="body1" component="label">Title</Typography>
                    <Typography variant="body1" component="p">{title}</Typography>
                </div>
            }
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
                notes &&
                <div className={classes.field}>
                    <Typography variant="body1" component="label">Notes</Typography>
                    <Typography variant="body1" component="p">{notes}</Typography>
                </div>
            }
        </>
    );
}

export default Booking;