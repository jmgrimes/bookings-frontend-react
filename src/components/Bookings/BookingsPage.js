import { 
  Container, 
  Grid,
  Typography 
} from "@material-ui/core";

import WeekPicker from "./WeekPicker";

export default function BookablesPage() {
  return (
    <Container className="bookings-page" component="main" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="body1" component="p">Bookings!</Typography>
        </Grid>
        <Grid item xs={9}>
          <WeekPicker date={new Date()} />
        </Grid>
      </Grid>
    </Container>
  );
};