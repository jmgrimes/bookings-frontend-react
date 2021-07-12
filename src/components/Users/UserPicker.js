import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import {
  useContext,
  useEffect,
  useState
} from "react";

import { 
  UserContext, 
  UserSetContext 
} from ".";

const UserPicker = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);
  const [ users, setUsers ] = useState();

  const changeUser = (event) => {
    const selectedUserId = parseInt(event.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedUserId);
    setUser(selectedUser);
  };

  useEffect(
    () => {
      // todo replace this with the api getUsers method
      fetch("http://localhost:3001/users")
          .then(response => response.json())
          .then((users) => {
            setUser(users[0]);
            setUsers(users);
          });
    }, 
    [ setUser ]
  );

  if (users == null) {
    return (<CircularProgress />);
  }

  return (
    <FormControl>
      <Select value={ user.id } onChange={ changeUser }>
        { users.map((u) => (<MenuItem key={ u.id } value={ u.id }>{ u.name }</MenuItem>)) }
      </Select>
    </FormControl>
  );
};

export default UserPicker;