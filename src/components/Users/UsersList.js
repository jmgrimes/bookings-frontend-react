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
import {
  Skeleton
} from "@material-ui/lab";
import { 
  Person 
} from "@material-ui/icons";
import { 
  Fragment, 
  useEffect, 
  useState 
} from "react";
import getData from "../../utils/api";

export default function UsersList() {
  const [ users, setUsers ] = useState([]);
  const [ userIndex, setUserIndex ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  const user = users?.[userIndex];
  
  useEffect(() => {
    setUsers([]);
    setError(false);
    setIsLoading(true);
    getData("http://localhost:3001/users")
        .then(data => {
          setUsers(data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
  }, []);

  if (error) {
    return (
      <Typography variant="body1" component="p">{error}</Typography>
    )
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <List item>
            { !isLoading ? 
              users.map((user, index) => (
                <ListItem button selected={ index === userIndex } onClick={ () => setUserIndex(index) }>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={ user.name } />
                </ListItem>
              )) :
              [...Array(3)].map(() => (
                <ListItem button>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={ <Skeleton animation="wave" />} />
                </ListItem>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardHeader 
                title={ !isLoading ? user.name : <Skeleton animation="wave" width="60%" /> } 
                subheader={ !isLoading ? user.title : <Skeleton animation="wave" /> }/>
            <CardContent>
              <Typography variant="body1" color="textPrimary">
                { !isLoading ? user.notes : <Skeleton animation="wave" /> }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};