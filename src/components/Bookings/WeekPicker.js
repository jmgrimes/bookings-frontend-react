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

import { actions } from "./useWeek";
import { shortISO } from "../../utils/date-wrangler";

const useStyles = makeStyles((theme) => ({
  flexSpacer: {
    flexGrow: 1
  },
  spacer: {
    width: 5
  }
}));

const WeekPicker = ({ weekDispatch }) => {
  const classes = useStyles();
  const [ dateText, setDateText ] = useState(shortISO(new Date()));

  const nextWeek = () => weekDispatch(actions.nextWeek());
  const previousWeek = () => weekDispatch(actions.previousWeek());
  const setDate = () => weekDispatch(actions.setDate(new Date(dateText)));
  const today = () => weekDispatch(actions.today());

  return (
    <Fragment>
      <Toolbar>
        <Button startIcon={ <ArrowLeft /> } onClick={ previousWeek }>Previous</Button>
        <Typography className={ classes.flexSpacer } component="div" />
        <TextField type="date" value={ dateText } onChange={ (event) => setDateText(event.target.value) } />
        <Typography className={ classes.spacer } component="div" />
        <ButtonGroup variant="text">
          <Button startIcon={ <EventAvailable /> } onClick={ setDate }>Go</Button>
          <Button startIcon={ <CalendarToday /> } onClick={ today }>Today</Button>
        </ButtonGroup>
        <Typography className={ classes.flexSpacer } component="div" />
        <Button endIcon={ <ArrowRight /> } onClick={ nextWeek }>Next</Button>
      </Toolbar>
    </Fragment> 
  );
};

export default WeekPicker;