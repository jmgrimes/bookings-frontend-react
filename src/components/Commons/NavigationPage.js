import {
    AppBar,
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
    Suspense
} from "react";
import {
    ErrorBoundary
} from "react-error-boundary";
import {
    Link,
    useLocation
} from "react-router-dom";

import Error from "./Error";
import Loading from "./Loading";
import UserPicker from "../Users/UserPicker";

const useStyles = makeStyles(() => ({
    appbar: {
        marginBottom: 20
    },
    menuTabs: {
        flexGrow: 1
    }
}));

const NavigationPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const selectedTab = location.pathname.split("/").filter(path => path)?.[0]

  return (
      <AppBar position="static" color="transparent" className={classes.appbar}>
          <Toolbar>
              <ErrorBoundary FallbackComponent={Error}>
                  <Suspense fallback={<Loading message="Loading application navigation..."/>}>
                      <Tabs value={selectedTab} className={classes.menuTabs}>
                          <Tab icon={<Event/>}
                               component={Link}
                               label="Bookings"
                               value="bookings"
                               to="/bookings"/>
                          <Tab icon={<DevicesOther/>}
                               component={Link}
                               label="Bookables"
                               value="bookables"
                               to="/bookables"/>
                          <Tab icon={<People/>}
                               component={Link}
                               label="Users"
                               value="users"
                               to="/users"/>
                      </Tabs>
                      <UserPicker/>
                  </Suspense>
              </ErrorBoundary>
          </Toolbar>
      </AppBar>
  );
};

export default NavigationPage;