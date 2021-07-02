import { Container } from "@material-ui/core";

import UsersList from "./UsersList";

export default function BookablesPage() {
  return (
    <Container className="users-page" component="main" maxWidth="lg">
      <UsersList />
    </Container>
  );
};