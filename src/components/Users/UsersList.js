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
  useEffect, 
  useState 
} from "react";
import { getUsers } from "../../utils/api";

const UsersList = ({ user, setUser }) => {
  const [ users, setUsers ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);  

  useEffect(
    () => {
      getUsers()
          .then((users) => {
            setUser(users[0]);
            setUsers(users);
            setIsLoading(false);
          })
          .catch(error => {
            setError(error);
            setIsLoading(false);
          });
    }, 
    [ setUser ]
  );

  if (error) {
    return (
      <Typography variant="body1" component="p">{ error }</Typography>
    )
  }

  return (
    <List item>
      { 
        !isLoading ? 
        users.map((u) => (
          <ListItem button selected={ u === user } onClick={ () => setUser(u) }>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={ u.name } />
          </ListItem>
        )) :
        [...Array(3)].map(() => (
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={ <Skeleton animation="wave" /> } />
          </ListItem>
        ))
      }
    </List>
  );
};

export default UsersList;