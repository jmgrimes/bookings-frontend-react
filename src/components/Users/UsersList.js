import { 
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

import { 
  Fragment, 
  useState 
} from "react";

import { users } from "../../static.json";

export default function UsersList() {
  const [ userIndex, setUserIndex ] = useState(0);
  const user = users[userIndex];

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <List item>
            {users.map((user, index) => (
              <ListItem button selected={index === userIndex} onClick={() => setUserIndex(index)}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        {user && (
          <Grid item xs={9}>
            <Card>
              <CardHeader title={user.name} subheader={user.title}/>
              <CardContent>
                <Typography variant="body1" color="textPrimary">{user.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};