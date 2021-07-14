import { 
  AppBar,
  CssBaseline,
  Tab,
  Tabs,
  Toolbar,
  makeStyles
} from "@material-ui/core";
import {
  DevicesOther,
  Event, 
  People
} from "@material-ui/icons";
import { 
  BrowserRouter as Router, 
  Link,
  Routes, 
  Route,
  useLocation
} from "react-router-dom";

import { 
  BookablesPage 
} from "./Bookables";
import { 
  BookingsPage 
} from "./Bookings";
import { 
  UserProvider,
  UserPicker, 
  UsersPage 
} from "./Users";

const useStyles = makeStyles((theme) => ({
  appbar: {
    marginBottom: 20
  },
  menutabs: {
    flexGrow: 1
  }
}));

const AppNavigation = () => {
  const classes = useStyles();
  const location = useLocation();
  const selectedTab = location.pathname.split("/").filter(path => path)?.[0];
  return (
    <AppBar position="static" color="transparent" className={ classes.appbar }>
      <Toolbar>
        <Tabs value={ selectedTab } className={ classes.menutabs }>
          <Tab value="bookings" icon={ <Event /> } component={ Link } label="Bookings" to="/bookings" />
          <Tab value="bookables" icon={ <DevicesOther /> } component={ Link } label="Bookables" to="/bookables" />
          <Tab value="users" icon={ <People /> } component={ Link } label="Users" to="/users" />
        </Tabs>
        <UserPicker />
      </Toolbar>
    </AppBar>
  );
}

const App = () => {
  return (
    <Router>
      <UserProvider>
        <CssBaseline />
        <AppNavigation />
        <Routes>
          <Route path="/bookings" element={ <BookingsPage /> } />
          <Route path="/bookables/*" element={ <BookablesPage /> } />
          <Route path="/users/*" element={ <UsersPage /> } />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;