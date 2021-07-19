import {
    Button,
    ButtonGroup,
    TextField,
    Toolbar,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    ArrowLeft,
    ArrowRight,
    CalendarToday,
    EventAvailable
} from "@material-ui/icons";
import {
    DateTime
} from "luxon";
import {
    useState
} from "react";

import useBookingsParams from "./useBookingsParams";

const useStyles = makeStyles((theme) => ({
    flexSpacer: {
        flexGrow: 1
    },
    spacer: {
        width: 5
    }
}));

const WeekPicker = () => {
    const classes = useStyles();
    const [dateText, setDateText] = useState(DateTime.now().toISODate());
    const {date, setBookingsDate} = useBookingsParams();
    const dates = {
        previous: date.minus({ days: 7 }),
        next: date.plus({ days: 7} ),
        today: DateTime.now()
    };

    return (
        <Toolbar>
            <Button startIcon={<ArrowLeft/>} onClick={() => setBookingsDate(dates.previous)}>Previous</Button>
            <Typography className={classes.flexSpacer} component="div"/>
            <TextField type="date" value={dateText} onChange={(event) => setDateText(event.target.value)}/>
            <Typography className={classes.spacer} component="div"/>
            <ButtonGroup variant="text">
                <Button startIcon={<EventAvailable/>} onClick={() => setBookingsDate(DateTime.fromISO(dateText))}>Go</Button>
                <Button startIcon={<CalendarToday/>} onClick={() => setBookingsDate(dates.today)}>Today</Button>
            </ButtonGroup>
            <Typography className={classes.flexSpacer} component="div"/>
            <Button endIcon={<ArrowRight/>} onClick={() => setBookingsDate(dates.next)}>Next</Button>
        </Toolbar>
    );
};

export default WeekPicker;