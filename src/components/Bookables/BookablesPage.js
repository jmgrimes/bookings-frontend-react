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

const BookableEdit = lazy(() => import("./BookableEdit").then(module => ({default: module.default})));
const BookableNew = lazy(() => import("./BookableNew").then(module => ({default: module.default})));
const BookablesView = lazy(() => import("./BookablesView").then(module => ({default: module.default})));

const BookablesPage = () => {
    return (
        <Container component="main" maxWidth="lg">
            <Routes>
                <Route path="/" element={<BookablesView/>}/>
                <Route path="/:id" element={<BookablesView/>}/>
                <Route path="/:id/edit" element={<BookableEdit/>}/>
                <Route path="new" element={<BookableNew/>}/>
            </Routes>
        </Container>
    );
};

export default BookablesPage;