import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import {
  useEffect
} from "react";

import { 
  useCurrentUser,
  useUsers
} from ".";
import {
  isError,
  isLoading
} from "../../utils/useFetch";

const UserPicker = () => {
  const [ currentUser, setCurrentUser ] = useCurrentUser();
  const { users, error, status } = useUsers();

  const changeUser = (event) => {
    const selectedUserId = parseInt(event.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedUserId);
    setCurrentUser(selectedUser);
  };

  useEffect(
    () => {
      setCurrentUser(users[0]);
    }, 
    [ users, setCurrentUser ]
  );

  if (isError(status)) {
    return (
      <Typography variant="body1" component="p">{ error.message }</Typography>
    );
  }

  if (isLoading(status)) {
    return (
      <CircularProgress />
    );
  }

  return (
    <FormControl>
      <Select value={ currentUser?.id } onChange={ changeUser }>
        { users.map((u) => (<MenuItem key={ u.id } value={ u.id }>{ u.name }</MenuItem>)) }
      </Select>
    </FormControl>
  );
};

export default UserPicker;