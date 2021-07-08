import { Container } from "@material-ui/core";

import BookablesView from "./BookablesView";

export default BookablesPage = () => {
  return (
    <Container className="bookables-page" component="main" maxWidth="lg">
      <BookablesView />
    </Container>
  );
};