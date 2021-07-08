import { Container } from "@material-ui/core";

import UsersView from "./UsersView";

export default function BookablesPage() {
  return (
    <Container className="users-page" component="main" maxWidth="lg">
      <UsersView />
    </Container>
  );
};