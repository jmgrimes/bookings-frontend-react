import { 
  AppBar,
  CssBaseline,
  Tab,
  Tabs,
  Toolbar,
  makeStyles
} from "@material-ui/core";
import {
  Category, 
  Event, 
  People
} from "@material-ui/icons";
import { Fragment } from "react";
import { 
  BrowserRouter as Router, 
  Link,
  Routes, 
  Route
} from "react-router-dom";

import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UserPicker from "./Users/UserPicker";
import UsersPage from "./Users/UsersPage";

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: 20
  },
  menutabs: {
    flexGrow: 1
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="transparent" className={classes.appbar}>
          <Toolbar>
            <Tabs className={classes.menutabs}>
              <Tab icon={<Event />} label="Bookings" component={Link} to="/bookings" />
              <Tab icon={<Category />} label="Bookables" component={Link} to="/bookables" />
              <Tab icon={<People />} label="Users" component={Link} to="/users" />
            </Tabs>
            <UserPicker />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </Fragment>
  );
};