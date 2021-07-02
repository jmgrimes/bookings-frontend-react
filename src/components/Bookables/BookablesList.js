import {
  Button, 
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { 
  ArrowLeft,
  ArrowRight,
  CalendarToday,
  Category,
  Event
} from "@material-ui/icons";
import { 
  Fragment, 
  useReducer 
} from "react";

import {
  actions,
  reducer,
} from "./reducer";
import { 
  bookables,
  days, 
  sessions 
} from "../../static.json";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  showDetails: true,
  bookables
};

export default function BookablesList() {
  const [ { group, bookableIndex, showDetails, bookables }, dispatch ] = useReducer(reducer, initialState);

  const groups = [ ...new Set(bookables.map(bookable => bookable.group)) ];
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  const nextBookable = () => dispatch(actions.nextBookable());
  const previousBookable = () => dispatch(actions.previousBookable());
  const setBookable = (index) => dispatch(actions.setBookable(index));
  const setGroup = (group) => dispatch(actions.setGroup(group));
  const toggleDetails = () => dispatch(actions.toggleDetails());

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Select fullWidth value={group} onChange={event => setGroup(event.target.value)}>
            {groups.map(group => <MenuItem value={group} key={group}>{group}</MenuItem>)}
          </Select>
          <List>
            {bookablesInGroup.map((bookable, index) => (
              <ListItem key={bookable.id} selected={index === bookableIndex} onClick={() => setBookable(index)}>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText primary={bookable.title}/>
              </ListItem>
            ))}
          </List>
          <ButtonGroup fullWidth variant="outlined">
            <Button color="primary" startIcon={<ArrowLeft />} onClick={previousBookable}>Prev</Button>
            <Button color="primary" endIcon={<ArrowRight />} onClick={nextBookable}>Next</Button>
          </ButtonGroup>
        </Grid>
        { bookable && (
          <Grid item xs={9}>
            <Card>
              <CardHeader title={bookable.title} action={
                <FormControlLabel label="Show Details" control={
                  <Checkbox checked={showDetails} onChange={toggleDetails}/>
                }/>
              }/>
              <CardContent>
                <Typography variant="body1" color="textPrimary">{bookable.notes}</Typography>
              </CardContent>
              {showDetails && (
                <CardContent>
                  <Typography variant="h6" component="h6" color="textPrimary">Availability</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <List>
                        {bookable.days.sort().map(day => <ListItem key={day}>
                          <ListItemIcon>
                            <CalendarToday />
                          </ListItemIcon>
                          <ListItemText primary={days[day]}/>
                        </ListItem>)}
                      </List>
                    </Grid>
                    <Grid item xs={6}>
                      <List>
                        {bookable.sessions.map(session => <ListItem key={session}>
                          <ListItemIcon>
                            <Event />
                          </ListItemIcon>
                          <ListItemText primary={sessions[session]}/>
                        </ListItem>)}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              )}
            </Card>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};