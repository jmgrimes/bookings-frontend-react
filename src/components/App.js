import {
    CssBaseline
} from "@material-ui/core";
import {
    Suspense, 
    lazy
} from "react";
import {
    ErrorBoundary
} from "react-error-boundary";
import {
    Route,
    Routes
} from "react-router-dom";
import {
    QueryClient, 
    QueryClientProvider
} from "react-query";
import {
    ErrorPage, 
    LoadingPage, 
    NavigationPage
} from "./Commons";
import {
    UserProvider
} from "./Users";

const LazyBookablesPage = lazy(() => import("./Bookables").then(module => ({default: module.BookablesPage})));
const LazyBookingsPage = lazy(() => import("./Bookings").then(module => ({default: module.BookingsPage})));
const LazyUsersPage = lazy(() => import("./Users").then(module => ({default: module.UsersPage})));

const queryClient = new QueryClient();

const BookablesPage = () => {
    return (
        <Suspense fallback={<LoadingPage message="Loading bookables page..."/>}>
            <LazyBookablesPage/>
        </Suspense>
    );
};

const BookingsPage = () => {
    return (
        <Suspense fallback={<LoadingPage message="Loading bookings page..."/>}>
            <LazyBookingsPage/>
        </Suspense>
    );
};

const UsersPage = () => {
    return (
        <Suspense fallback={<LoadingPage message="Loading users page..."/>}>
            <LazyUsersPage/>
        </Suspense>
    );
};

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <CssBaseline/>
                <NavigationPage/>
                <ErrorBoundary FallbackComponent={ErrorPage}>
                    <Routes>
                        <Route path="/bookings" element={<BookingsPage/>}/>
                        <Route path="/bookables/*" element={<BookablesPage/>}/>
                        <Route path="/users/*" element={<UsersPage/>}/>
                    </Routes>
                </ErrorBoundary>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default App;