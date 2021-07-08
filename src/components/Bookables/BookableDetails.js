import {
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
  Typography
} from "@material-ui/core";
import { 
  CalendarToday,
  Event
} from "@material-ui/icons";
import { 
  useState
} from "react";

import {
  days,
  sessions
} from "../../static.json";

export default function BookableDetails({ bookable }) {
  const [ showDetails, setShowDetails ] = useState(true);
  const toggleDetails = () => setShowDetails(showDetails => !showDetails);

  return (
    bookable ?
    <Card>
      <CardHeader 
          title={ bookable.title } 
          action={ 
            <FormControlLabel 
                label="Show Details" 
                control={ <Checkbox checked={ showDetails } onChange={ toggleDetails } /> } 
            />
          } 
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary">{ bookable.notes }</Typography>
      </CardContent>
      { 
        showDetails && 
        <CardContent>
          <Typography variant="h6" component="h6" color="textPrimary">Availability</Typography>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 6 }>
              <List>
                { 
                  bookable.days.sort().map((day) => (
                    <ListItem key={ day }>
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      <ListItemText primary={ days[day] } />
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
            <Grid item xs={ 6 }>
              <List>
                { 
                  bookable.sessions.map((session) => (
                    <ListItem key={ session }>
                      <ListItemIcon>
                        <Event />
                      </ListItemIcon>
                      <ListItemText primary={ sessions[session] } />
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
          </Grid>
        </CardContent>
      }
    </Card> :
    null
  );
}