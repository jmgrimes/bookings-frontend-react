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

export default function UserPicker() {
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
      <Select value="" displayEmpty="true">
        <MenuItem value="" selected>
          <em>Users</em>
        </MenuItem>
        {users.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem> )}
      </Select>
    </FormControl>
  );
}