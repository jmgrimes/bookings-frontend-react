import {
    Grid
} from "@material-ui/core";
import {
    useParams
} from "react-router-dom";

import {
    Error,
    Loading
} from "../Commons";
import {
    useUsers 
} from "../../apis/Users";

import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import { useUser } from "./UserProvider";

const UsersView = () => {
    const {id} = useParams();
    const {users, error, isError, isLoading} = useUsers();
    const [currentUser] = useUser();

    const user = id ? users.find(u => u.id === parseInt(id, 10)) || users[0] : currentUser;
    const getUrl = id => `/users/${id}`;

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={error}/>;

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