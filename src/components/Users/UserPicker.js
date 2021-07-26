import {
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core";
import {
    useEffect
} from "react";

import useUser from "./useUser";
import useUsers from "./useUsers";

const UserPicker = () => {
    const [user, setUser] = useUser();
    const {users} = useUsers({suspense: true});

    const changeUser = event => {
        const selectedUserId = parseInt(event.target.value, 10);
        const selectedUser = users.find(u => u.id === selectedUserId);
        setUser(selectedUser);
    };

    useEffect(
        () => {
            setUser(users[0]);
        },
        [users, setUser]
    );

    return (
        <FormControl>
            <Select value={user?.id || ""} onChange={changeUser}>
                {
                    users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default UserPicker;