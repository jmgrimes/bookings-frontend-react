import { 
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
  useUsers
} from ".";
import { 
  isError, 
  isLoading
} from "../../utils/useFetch";

const UsersList = ({ user, setUser }) => {
  const { users, error, status } = useUsers();

  if (isError(status)) {
    return (
      <Typography variant="body1" component="p">{ error.message }</Typography>
    )
  }

  if (isLoading(status)) {
    return (
      <List item>
        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={ <Skeleton animation="wave" /> } />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={ <Skeleton animation="wave" /> } />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={ <Skeleton animation="wave" /> } />
        </ListItem>
      </List>
    );
  }

  return (
    <List item>
      { 
        users.map((u) => (
          <ListItem button selected={ u.id === user.id } onClick={ () => setUser(u) }>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={ u.name } />
          </ListItem>
        ))
      }
    </List>
  );
};

export default UsersList;