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
    ErrorPage, 
    LoadingPage, 
    NavigationPage
} from "./Commons";
import {
    UserProvider
} from "./Users";

const BookablesPage = lazy(() => import("./Bookables").then(module => ({default: module.BookablesPage})));
const BookingsPage = lazy(() => import("./Bookings").then(module => ({default: module.BookingsPage})));
const UsersPage = lazy(() => import("./Users").then(module => ({default: module.UsersPage})));

const App = () => {
    return (
        <UserProvider>
            <CssBaseline/>
            <NavigationPage/>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <Routes>
                    <Route path="/bookings" element={
                        <Suspense fallback={<LoadingPage message="Loading bookings page..."/>}>
                            <BookingsPage/>
                        </Suspense>
                    }/>
                    <Route path="/bookables/*" element={
                        <Suspense fallback={<LoadingPage message="Loading bookables page..."/>}>
                            <BookablesPage/>
                        </Suspense>
                    }/>
                    <Route path="/users/*" element={
                        <Suspense fallback={<LoadingPage message="Loading users page..."/>}>
                            <UsersPage/>
                        </Suspense>
                    }/>
                </Routes>
            </ErrorBoundary>
        </UserProvider>
    );
};

export default App;