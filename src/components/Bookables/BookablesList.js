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
  Skeleton
} from "@material-ui/lab";
import { 
  Fragment, 
  useEffect,
  useReducer 
} from "react";

import {
  actions,
  reducer,
} from "./reducer";
import getData from "../../utils/api";
import { 
  days, 
  sessions 
} from "../../static.json";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  showDetails: true,
  isLoading: true,
  error: false,
  bookables: []
};

export default function BookablesList() {
  const [ 
    { group, bookableIndex, showDetails, isLoading, error, bookables }, dispatch 
  ] = useReducer(reducer, initialState);

  const groups = [ ...new Set(bookables.map(bookable => bookable.group)) ];
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  const fetchBookablesRequest = () => dispatch(actions.fetchBookablesRequest());
  const fetchBookablesSuccess = (bookables) => dispatch(actions.fetchBookablesSuccess(bookables));
  const fetchBookablesError = (error) => dispatch(actions.fetchBookablesError(error));
  const nextBookable = () => dispatch(actions.nextBookable());
  const previousBookable = () => dispatch(actions.previousBookable());
  const setBookable = (index) => dispatch(actions.setBookable(index));
  const setGroup = (group) => dispatch(actions.setGroup(group));
  const toggleDetails = () => dispatch(actions.toggleDetails());

  useEffect(() => {
    fetchBookablesRequest();
    getData("http://localhost:3001/bookables")
        .then(fetchBookablesSuccess)
        .catch(fetchBookablesError);
  }, []);

  if (error) {
    return (
      <Typography variant="body1" component="p">{error}</Typography>
    )
  }

  return (
    <Fragment>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 3 }>
          { !isLoading && 
            <Select fullWidth value={ group } onChange={ event => setGroup(event.target.value) }>
              { groups.map(group => <MenuItem value={ group } key={ group }>{ group }</MenuItem>) }
            </Select> 
          }
          <List>
            { !isLoading ? 
              bookablesInGroup.map((bookable, index) => 
                <ListItem key={ bookable.id } selected={ index === bookableIndex } onClick={ () => setBookable(index) }>
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <ListItemText primary={ bookable.title }/>
                </ListItem>
              ) : 
              [...Array(3)].map(() => 
                <ListItem button>
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <ListItemText primary={ <Skeleton animation="wave" /> } />
                </ListItem>
              )
            }
          </List>
          { !isLoading && 
            <ButtonGroup fullWidth variant="outlined">
              <Button color="primary" startIcon= {<ArrowLeft /> } onClick={ previousBookable }>Prev</Button>
              <Button color="primary" endIcon={ <ArrowRight /> } onClick={ nextBookable }>Next</Button>
            </ButtonGroup> 
          }
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardHeader 
                title={ !isLoading ? bookable.title : <Skeleton animation="wave" width="60%" /> } 
                action={ !isLoading &&
                  <FormControlLabel 
                      label="Show Details" 
                      control={ <Checkbox checked={ showDetails } onChange={ toggleDetails }/> }/>
                } />
            <CardContent>
              <Typography variant="body1" color="textPrimary">
                { !isLoading ? bookable.notes : <Skeleton animation="wave" /> }
              </Typography>
            </CardContent>
            { !isLoading && showDetails && 
              <CardContent>
                <Typography variant="h6" component="h6" color="textPrimary">Availability</Typography>
                <Grid container spacing={ 3 }>
                  <Grid item xs={ 6 }>
                    <List>
                      { bookable.days.sort().map(day => 
                        <ListItem key={ day }>
                          <ListItemIcon>
                            <CalendarToday />
                          </ListItemIcon>
                          <ListItemText primary={ days[day] }/>
                        </ListItem>
                      ) }
                    </List>
                  </Grid>
                  <Grid item xs={ 6 }>
                    <List>
                      { bookable.sessions.map(session => 
                        <ListItem key={ session }>
                          <ListItemIcon>
                            <Event />
                          </ListItemIcon>
                          <ListItemText primary={ sessions[session] }/>
                        </ListItem>
                      ) }
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            }
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};