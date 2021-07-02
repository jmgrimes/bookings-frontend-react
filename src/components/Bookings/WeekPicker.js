import {
  Button,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import { 
  ArrowLeft,
  ArrowRight,
  CalendarToday
} from "@material-ui/icons";
import { 
  Fragment, 
  useReducer 
} from "react";

import { actions, initializer, reducer } from "./weekReducer";

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1
  }
}));

export default function WeekPicker({ date }) {
  const classes = useStyles();
  const [ week, dispatch ] = useReducer(reducer, date, initializer);

  const nextWeek = () => dispatch(actions.nextWeek());
  const previousWeek = () => dispatch(actions.previousWeek());
  const today = () => dispatch(actions.today());

  return (
    <Fragment>
      <Toolbar>
        <Button variant="outlined" color="primary" startIcon={<ArrowLeft />} onClick={previousWeek}>Prev</Button>
        <Typography className={classes.spacer} component="div"/>
        <Button variant="outlined" color="primary" startIcon={<CalendarToday />} onClick={today}>Today</Button>
        <Typography className={classes.spacer} component="div"/>
        <Button variant="outlined" color="primary" endIcon={<ArrowRight />} onClick={nextWeek}>Next</Button>
      </Toolbar>
      <Typography variant="body1" component="p" align="center">{week.start.toDateString()} - {week.end.toDateString()}</Typography>
    </Fragment> 
  );
};