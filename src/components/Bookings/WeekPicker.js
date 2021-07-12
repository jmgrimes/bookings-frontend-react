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
  Fragment, 
  useState
} from "react";

import { shortISO } from "../../utils/dates";

const useStyles = makeStyles((theme) => ({
  flexSpacer: {
    flexGrow: 1
  },
  spacer: {
    width: 5
  }
}));

const WeekPicker = ({ nextWeek, previousWeek, weekOfDate, weekOfToday }) => {
  const classes = useStyles();
  const [ dateText, setDateText ] = useState(shortISO(new Date()));

  return (
    <Fragment>
      <Toolbar>
        <Button startIcon={ <ArrowLeft /> } onClick={ previousWeek() }>Previous</Button>
        <Typography className={ classes.flexSpacer } component="div" />
        <TextField type="date" value={ dateText } onChange={ (event) => setDateText(event.target.value) } />
        <Typography className={ classes.spacer } component="div" />
        <ButtonGroup variant="text">
          <Button startIcon={ <EventAvailable /> } onClick={ weekOfDate(new Date(dateText)) }>Go</Button>
          <Button startIcon={ <CalendarToday /> } onClick={ weekOfToday() }>Today</Button>
        </ButtonGroup>
        <Typography className={ classes.flexSpacer } component="div" />
        <Button endIcon={ <ArrowRight /> } onClick={ nextWeek() }>Next</Button>
      </Toolbar>
    </Fragment> 
  );
};

export default WeekPicker;