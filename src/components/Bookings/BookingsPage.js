import { 
  Container, 
  Typography 
} from "@material-ui/core";

export default function BookablesPage() {
  return (
    <Container className="bookings-page" component="main" maxWidth="lg">
      <Typography variant="body1" component="p">Bookings!</Typography>
    </Container>
  );
};