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
import {
  useState
} from "react";
import { 
  BrowserRouter as Router, 
  Link,
  Routes, 
  Route
} from "react-router-dom";

import { BookablesPage } from "./Bookables";
import { BookingsPage } from "./Bookings";
import { UserContext, UserPicker, UsersPage } from "./Users";

const useStyles = makeStyles(theme => ({
  appbar: {
    marginBottom: 20
  },
  menutabs: {
    flexGrow: 1
  }
}));

const App = () => {
  const classes = useStyles();
  const [ user, setUser ] = useState();

  return (
    <UserContext.Provider value={ user }>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="transparent" className={ classes.appbar }>
          <Toolbar>
            <Tabs className={ classes.menutabs }>
              <Tab icon={ <Event /> } component={ Link } label="Bookings" to="/bookings" />
              <Tab icon={ <Category /> } component={ Link } label="Bookables" to="/bookables" />
              <Tab icon={ <People /> } component={ Link } label="Users" to="/users" />
            </Tabs>
            <UserPicker user={ user } setUser={ setUser } />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/bookings" element={ <BookingsPage /> } />
          <Route path="/bookables" element={ <BookablesPage /> } />
          <Route path="/users" element={ <UsersPage /> } />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;