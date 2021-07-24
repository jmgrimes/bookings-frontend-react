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
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Route, Routes, useLocation} from "react-router";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import {Error, ErrorPage, Loading, LoadingPage} from "./Commons";
import {UserPicker, UserProvider} from "./Users";

const BookablesPage = React.lazy(() => import("./Bookables").then(module => ({default: module.BookablesPage})));
const BookingsPage = React.lazy(() => import("./Bookings").then(module => ({default: module.BookingsPage})));
const UsersPage = React.lazy(() => import("./Users").then(module => ({default: module.UsersPage})));

const queryClient = new QueryClient();
const useStyles = makeStyles(() => ({
    appbar: {
        marginBottom: 20
    },
    menuTabs: {
        flexGrow: 1
    }
}));

const AppNavigation = () => {
    const classes = useStyles();
    const location = useLocation();
    const selectedTab = location.pathname.split("/").filter(path => path)?.[0];
    return (
        <AppBar position="static" color="transparent" className={classes.appbar}>
            <Toolbar>
                <ErrorBoundary FallbackComponent={Error}>
                    <React.Suspense fallback={<Loading message="Loading application navigation..."/>}>
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
                    </React.Suspense>
                </ErrorBoundary>
            </Toolbar>
        </AppBar>
    );
}

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <CssBaseline/>
                <Router>
                    <AppNavigation/>
                    <ErrorBoundary FallbackComponent={ErrorPage}>
                        <Routes>
                            <Route path="/bookings">
                                <React.Suspense fallback={<LoadingPage message="Loading bookings page..."/>}>
                                    <BookingsPage/>
                                </React.Suspense>
                            </Route>
                            <Route path="/bookables/*">
                                <React.Suspense fallback={<LoadingPage message="Loading bookables page..."/>}>
                                    <BookablesPage/>
                                </React.Suspense>
                            </Route>
                            <Route path="/users/*">
                                <React.Suspense fallback={<LoadingPage message="Loading users page..."/>}>
                                    <UsersPage/>
                                </React.Suspense>
                            </Route>
                        </Routes>
                    </ErrorBoundary>
                </Router>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default App;