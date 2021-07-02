import { Container } from "@material-ui/core";

import BookablesList from "./BookablesList";

export default function BookablesPage() {
  return (
    <Container className="bookables-page" component="main" maxWidth="lg">
      <BookablesList />
    </Container>
  );
};