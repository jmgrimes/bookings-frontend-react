import {
    Container
} from "@material-ui/core";

import Error from "./Error";

const ErrorPage = ({error}) => {
    return (
        <Container component="main" maxWidth="lg">
            <Error jumbotron error={error}/>
        </Container>
    )
};

export default ErrorPage;