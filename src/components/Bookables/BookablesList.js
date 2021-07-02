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
import React, { Fragment } from "react";

import { 
  days, 
  sessions 
} from "../../static.json";
import { useActions } from "./actions";

export default function BookablesList() {
  const [ 
    { group, bookableIndex, hasDetails, bookables }, 
    { setGroup, setBookable, nextBookable, previousBookable, toggleDetails }
  ] = useActions();
  const groups = [ ...new Set(bookables.map(bookable => bookable.group)) ];
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Select id="group" value={group} onChange={event => setGroup(event.target.value)} fullWidth>
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
          <ButtonGroup fullWidth variant="text">
            <Button color="primary" onClick={previousBookable} startIcon={<ArrowLeft />}>Prev</Button>
            <Button color="primary" onClick={nextBookable} endIcon={<ArrowRight />}>Next</Button>
          </ButtonGroup>
        </Grid>
        { bookable && (
          <Grid item xs={9}>
            <Card>
              <CardHeader title={bookable.title} action={
                <FormControlLabel label="Show Details" control={
                  <Checkbox checked={hasDetails} onChange={toggleDetails}/>
                }/>
              }/>
              <CardContent>
                <Typography variant="body1" color="textPrimary">{bookable.notes}</Typography>
              </CardContent>
                {hasDetails && (
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