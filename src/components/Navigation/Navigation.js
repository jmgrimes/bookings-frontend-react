import { 
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  Category, 
  Event, 
  People
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import UserPicker from "../Users/UserPicker";

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: 20
  },
  spacer: {
    flexGrow: 1
  }
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="default" className={classes.appbar}>
      <Toolbar>
        <Link to="/bookings">
          <Button color="primary" startIcon={<Event />}>Bookings</Button>
        </Link>
        <Link to="/bookables">
          <Button color="primary" startIcon={<Category />}>Bookables</Button>
        </Link>
        <Link to="/users">
          <Button color="primary" startIcon={<People />}>Users</Button>
        </Link>
        <Typography className={classes.spacer} component="div" />
        <UserPicker />
      </Toolbar>
    </AppBar>
  );
};