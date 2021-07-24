import {
    Container
} from "@material-ui/core";
import React from "react";
import {Route, Routes} from "react-router";

const BookableEdit = React.lazy(() => import("./BookableEdit").then(module => ({default: module.default})));
const BookableNew = React.lazy(() => import("./BookableNew").then(module => ({default: module.default})));
const BookablesView = React.lazy(() => import("./BookablesView").then(module => ({default: module.default})));

const BookablesPage = () => {
    return (
        <Container component="main" maxWidth="lg">
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