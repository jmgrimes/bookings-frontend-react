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
  isError,
  isLoading
} from "../../utils/useFetch";

import useUser from "./useUser";
import useUsers from "./useUsers";

const UserPicker = () => {
  const [ user, setUser ] = useUser();
  const { users, error, status } = useUsers();

  const changeUser = (event) => {
    const selectedUserId = parseInt(event.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedUserId);
    setUser(selectedUser);
  };

  useEffect(
    () => {
      setUser(users[0]);
    }, 
    [ users, setUser ]
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
      <Select value={ user?.id || "" } onChange={ changeUser }>
        { users.map((u) => (<MenuItem key={ u.id } value={ u.id }>{ u.name }</MenuItem>)) }
      </Select>
    </FormControl>
  );
};

export default UserPicker;