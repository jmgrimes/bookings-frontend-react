import {
    Container
} from "@material-ui/core";

import BookingsView from "./BookingsView";

const BookingsPage = () => {
    return (
        <Container className="bookings-page" component="main" maxWidth="xl">
            <BookingsView/>
        </Container>
    );
};

export default BookingsPage;