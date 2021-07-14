import { 
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  Fragment
} from "react";

const useStyles = makeStyles(() => ({
  field: {
    marginBottom: 10,
    "& label": {
      fontWeight: "bold"
    }
  }
}));

const Booking = ({ bookable, booking }) => {
  const classes = useStyles();
  const { title, date, session, notes } = booking;
  return (
    <Fragment>
      {
        title &&
        <Typography variant="body1" component="div" className={ classes.field }>
          <Typography variant="body1" component="label">Title</Typography>
          <Typography variant="body1" component="p">{ title }</Typography>
        </Typography>
      }
      <Typography variant="body1" component="div" className={ classes.field }>
        <Typography variant="body1" component="label">Bookable</Typography>
        <Typography variant="body1" component="p">{ bookable.title }</Typography>
      </Typography>
      <Typography variant="body1" component="div" className={ classes.field }>
        <Typography variant="body1" component="label">Booking Date</Typography>
        <Typography variant="body1" component="p">{ new Date(date).toDateString() }</Typography>
      </Typography>
      <Typography variant="body1" component="div" className={ classes.field }>
        <Typography variant="body1" component="label">Session</Typography>
        <Typography variant="body1" component="p">{ session }</Typography>
      </Typography>
      {
        notes &&
        <Typography variant="body1" component="div" className={ classes.field }>
          <Typography variant="body1" component="label">Notes</Typography>
          <Typography variant="body1" component="p">{ notes }</Typography>
        </Typography>
      }
    </Fragment>
  );
}

export default Booking;