import {
    Button,
    ButtonGroup,
    TextField,
    Toolbar,
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

const useStyles = makeStyles(() => ({
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
            <div className={classes.flexSpacer}/>
            <TextField type="date" value={dateText} onChange={(event) => setDateText(event.target.value)}/>
            <div className={classes.flexSpacer}/>
            <ButtonGroup variant="text">
                <Button startIcon={<EventAvailable/>} onClick={() => setBookingsDate(DateTime.fromISO(dateText))}>Go</Button>
                <Button startIcon={<CalendarToday/>} onClick={() => setBookingsDate(dates.today)}>Today</Button>
            </ButtonGroup>
            <div className={classes.flexSpacer}/>
            <Button endIcon={<ArrowRight/>} onClick={() => setBookingsDate(dates.next)}>Next</Button>
        </Toolbar>
    );
};

export default WeekPicker;