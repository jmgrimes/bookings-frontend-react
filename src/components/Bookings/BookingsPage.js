import { 
  Container
} from "@material-ui/core";

import { 
  BookingsView 
} from ".";

const BookingsPage = () => {
  return (
    <Container className="bookings-page" component="main" maxWidth="xl">
      <BookingsView />
    </Container>
  );
};

export default BookingsPage;