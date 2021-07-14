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
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider
} from "react-query";

import {
    BookablesPage
} from "./Bookables";
import {
    BookingsPage
} from "./Bookings";
import {
    UserPicker,
    UserProvider,
    UsersPage
} from "./Users";

const queryClient = new QueryClient();
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
        <AppBar position="static" color="transparent" className={classes.appbar}>
            <Toolbar>
                <Tabs value={selectedTab} className={classes.menutabs}>
                    <Tab value="bookings" icon={<Event/>} component={Link} label="Bookings" to="/bookings"/>
                    <Tab value="bookables" icon={<DevicesOther/>} component={Link} label="Bookables" to="/bookables"/>
                    <Tab value="users" icon={<People/>} component={Link} label="Users" to="/users"/>
                </Tabs>
                <UserPicker/>
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
                    <Routes>
                        <Route path="/bookings" element={<BookingsPage/>}/>
                        <Route path="/bookables/*" element={<BookablesPage/>}/>
                        <Route path="/users/*" element={<UsersPage/>}/>
                    </Routes>
                </Router>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default App;