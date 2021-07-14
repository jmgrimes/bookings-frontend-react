import { 
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import { 
  useParams 
} from "react-router-dom";

import { 
  isError, 
  isLoading 
} from "../../utils/useFetch";

import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import useUser from "./useUser";
import useUsers from "./useUsers";

const UsersView = () => {
  const { id } = useParams();
  const { users, error, status } = useUsers();
  const [ currentUser ] = useUser();

  const user = id ? users.find((u) => (u.id === parseInt(id, 10))) || users[0] : currentUser;  

  if (isError(status)) {
    return (
      <Grid container alignContent="center" justifyContent="center" spacing={ 3 }>
        <Grid item xs={ 12 }>
          <Typography variant="body1" component="p">{ error.message }</Typography>
        </Grid>
      </Grid>
    );
  }

  if (isLoading(status)) {
    return (
      <Grid container alignContent="center" justifyContent="center" spacing={ 3 }>
        <Grid item xs={ 12 }>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 3 }>
        <UsersList users={ users } user={ user } getUrl={ (id) => (`/users/${ id }`) } />
      </Grid>
      <Grid item xs={ 9 }>
        <UserDetails user={ user } />
      </Grid>
    </Grid>
  );
};

export default UsersView;