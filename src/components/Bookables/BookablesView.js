import { Grid } from "@material-ui/core";
import { useState } from "react";

import BookableDetails from "./BookableDetails";
import BookablesList from "./BookablesList";

export default function BookablesView() {
  const [ bookable, setBookable ] = useState();

  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 3 }>
        <BookablesList bookable={ bookable } setBookable={ setBookable } />
      </Grid>
      <Grid item xs={ 9 }>
        <BookableDetails bookable={ bookable } />
      </Grid>
    </Grid>
  );
};