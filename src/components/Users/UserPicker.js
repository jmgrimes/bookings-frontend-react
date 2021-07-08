import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import {
  useEffect,
  useState
} from "react";

const UserPicker = () => {
  const [ users, setUsers ] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/users")
        .then(response => response.json())
        .then(setUsers)
  }, []);

  if (users == null) {
    return (<CircularProgress />);
  }

  return (
    <FormControl>
      <Select value="" displayEmpty>
        <MenuItem value="" selected>
          <em>Users</em>
        </MenuItem>
        { 
          users.map((u) => (
            <MenuItem key={ u.id } value={ u.id }>{ u.name }</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default UserPicker;