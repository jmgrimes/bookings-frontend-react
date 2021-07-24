import {
    Container
} from "@material-ui/core";
import React from "react";
import {Route, Routes} from "react-router";

const UsersView = React.lazy(() => import("./UsersView").then(module => ({default: module.default})));

const UsersPage = () => {
    return (
        <Container className="users-page" component="main" maxWidth="lg">
            <Routes>
                <Route path="/">
                    <UsersView/>
                </Route>
                <Route path="/:id">
                    <UsersView/>
                </Route>
            </Routes>
        </Container>
    );
};

export default UsersPage;