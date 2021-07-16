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
    useState
} from "react";

import {
    addDays,
    shortISO
} from "../../utils/dates";

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
    const [dateText, setDateText] = useState(shortISO(new Date()));
    const {date, setBookingsDate} = useBookingsParams();
    const dates = {
        previous: shortISO(addDays(date, -7)),
        next: shortISO(addDays(date, 7)),
        today: shortISO(new Date())
    };

    return (
        <Toolbar>
            <Button startIcon={<ArrowLeft/>} onClick={() => setBookingsDate(dates.previous)}>Previous</Button>
            <Typography className={classes.flexSpacer} component="div"/>
            <TextField type="date" value={dateText} onChange={(event) => setDateText(event.target.value)}/>
            <Typography className={classes.spacer} component="div"/>
            <ButtonGroup variant="text">
                <Button startIcon={<EventAvailable/>} onClick={() => setBookingsDate(dateText)}>Go</Button>
                <Button startIcon={<CalendarToday/>} onClick={() => setBookingsDate(dates.today)}>Today</Button>
            </ButtonGroup>
            <Typography className={classes.flexSpacer} component="div"/>
            <Button endIcon={<ArrowRight/>} onClick={() => setBookingsDate(dates.next)}>Next</Button>
        </Toolbar>
    );
};

export default WeekPicker;