import {
    Container
} from "@material-ui/core";

import Loading from "./Loading";

const LoadingPage = ({message}) => {
    return (
        <Container component="main" maxWidth="lg">
            <Loading jumbotron message={message}/>
        </Container>
    )
};

export default LoadingPage;