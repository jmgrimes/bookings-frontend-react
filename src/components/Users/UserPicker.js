import {
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";

import { users } from "../../static.json";

export default function UserPicker() {
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