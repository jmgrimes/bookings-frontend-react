import { 
  Container
} from "@material-ui/core";
import { 
  Route, 
  Routes 
} from "react-router-dom";

import UsersView from "./UsersView";

const UsersPage = () => {
  return (
    <Container className="users-page" component="main" maxWidth="lg">
      <Routes>
        <Route path="/">
          <UsersView />
        </Route>
        <Route path="/:id">
          <UsersView />
        </Route>
      </Routes>
    </Container>
  );
};

export default UsersPage;