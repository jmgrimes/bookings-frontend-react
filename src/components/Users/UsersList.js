import { 
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { 
  Person 
} from "@material-ui/icons";
import { 
  useNavigate 
} from "react-router-dom";

const UsersList = ({ users, user, getUrl }) => {
  const navigate = useNavigate();
  return (
    <List item>
      { 
        users.map((u) => (
          <ListItem button key={ u.id } selected={ u.id === user.id } onClick={ () => navigate(getUrl(u.id)) }>
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