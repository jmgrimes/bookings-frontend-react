import {
    Grid
} from "@material-ui/core";
import {useParams} from "react-router";

import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import {useUser} from "./UserProvider";
import {useUsers} from "../../apis/Users";

const getUrl = id => `/users/${id}`;

const UsersView = () => {
    const {id} = useParams();
    const {users} = useUsers({suspense: true});
    const [currentUser] = useUser();

    const user = id ? users.find(u => u.id === parseInt(id, 10)) || users[0] : currentUser;

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <UsersList users={users} user={user} getUrl={getUrl}/>
            </Grid>
            <Grid item xs={9}>
                <UserDetails user={user}/>
            </Grid>
        </Grid>
    );
};

export default UsersView;