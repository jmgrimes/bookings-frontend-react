import {
    Container
} from "@material-ui/core";
import {
    Route,
    Routes
} from "react-router-dom";

import BookableEdit from "./BookableEdit";
import BookableNew from "./BookableNew";
import BookablesView from "./BookablesView";

const BookablesPage = () => {
    return (
        <Container className="bookables-page" component="main" maxWidth="lg">
            <Routes>
                <Route path="/">
                    <BookablesView/>
                </Route>
                <Route path="/:id">
                    <BookablesView/>
                </Route>
                <Route path="/:id/edit">
                    <BookableEdit />
                </Route>
                <Route path="/new">
                    <BookableNew />
                </Route>
            </Routes>
        </Container>
    );
};

export default BookablesPage;