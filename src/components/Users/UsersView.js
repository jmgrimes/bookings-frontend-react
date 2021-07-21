import {
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import {
    useParams
} from "react-router-dom";

import {
    useUsers 
} from "../../apis/Users";

import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import useUser from "./useUser";

const UsersView = () => {
    const {id} = useParams();
    const {users, error, isError, isLoading} = useUsers();
    const [currentUser] = useUser();

    const user = id ? users.find((u) => (u.id === parseInt(id, 10))) || users[0] : currentUser;
    const getUrl = (id) => (`/users/${id}`);

    if (isError) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p">{error.message}</Typography>
                </Grid>
            </Grid>
        );
    }

    if (isLoading) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        );
    }

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