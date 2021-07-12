import { 
  Container, 
  Grid 
} from "@material-ui/core";
import {
  useState
} from "react";

import { 
  UserDetails, 
  UsersList,
  useCurrentUser
} from ".";

const UsersPage = () => {
  const [ user, setUser ] = useState();
  const [ currentUser ] = useCurrentUser();

  return (
    <Container className="users-page" component="main" maxWidth="lg">
      <Grid container spacing={ 3 }>
        <Grid item xs={ 3 }>
          <UsersList user={ user || currentUser } setUser={ setUser } />
        </Grid>
        <Grid item xs={ 9 }>
          <UserDetails user={ user || currentUser } />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersPage;