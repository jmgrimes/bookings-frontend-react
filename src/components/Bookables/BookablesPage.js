import { 
  Container,
  Grid
} from "@material-ui/core";
import { 
  useState 
} from "react";

import { 
  BookableDetails, 
  BookablesList 
} from ".";

const BookablesPage = () => {
  const [ bookable, setBookable ] = useState();

  return (
    <Container className="bookables-page" component="main" maxWidth="lg">
      <Grid container spacing={ 3 }>
        <Grid item xs={ 3 }>
          <BookablesList bookable={ bookable } setBookable={ setBookable } />
        </Grid>
        <Grid item xs={ 9 }>
          <BookableDetails bookable={ bookable } />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookablesPage;