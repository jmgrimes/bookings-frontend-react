import {
    Container
} from "@material-ui/core";
import {
    lazy
} from "react";
import {
    Route, 
    Routes
} from "react-router-dom";

const UsersView = lazy(() => import("./UsersView").then(module => ({default: module.default})));

const UsersPage = () => {
    return (
        <Container className="users-page" component="main" maxWidth="lg">
            <Routes>
                <Route path="/" element={<UsersView/>}/>
                <Route path="/:id" element={<UsersView/>}/>
            </Routes>
        </Container>
    );
};

export default UsersPage;