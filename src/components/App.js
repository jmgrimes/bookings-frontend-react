import { CssBaseline } from "@material-ui/core";
import { Fragment } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";

import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import Navigation from "./Navigation/Navigation";
import UsersPage from "./Users/UsersPage";

export default function App() {
  
  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </Fragment>
  );
};