import { Container } from "@material-ui/core";

import { BookablesView } from ".";

const BookablesPage = () => {
  return (
    <Container className="bookables-page" component="main" maxWidth="lg">
      <BookablesView />
    </Container>
  );
};

export default BookablesPage;