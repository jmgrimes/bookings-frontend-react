import { Container } from "@material-ui/core";

import { UsersView } from ".";

const UsersPage = () => {
  return (
    <Container className="users-page" component="main" maxWidth="lg">
      <UsersView />
    </Container>
  );
};

export default UsersPage;