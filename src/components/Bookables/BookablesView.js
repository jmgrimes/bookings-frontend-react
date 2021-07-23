import {
    Button,
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Add
} from "@material-ui/icons";
import {
    Link,
    useParams
} from "react-router-dom";

import {
    Error,
    Loading
} from "../Commons";
import {
    useBookables 
} from "../../apis/Bookables";

import BookableDetails from "./BookableDetails";
import BookablesList from "./BookablesList";


const useStyles = makeStyles(() => ({
    spacer: {
        marginBottom: 10
    }
}));

const BookablesView = () => {
    const classes = useStyles();
    const {id} = useParams();
    const {bookables, error, isLoading, isError} = useBookables();
    const bookable = bookables.find(b => b.id === parseInt(id, 10)) || bookables[0];
    const getUrl = id => (`/bookables/${id}`);

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={error}/>;

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <BookablesList bookable={bookable} bookables={bookables} getUrl={getUrl}/>
                <Typography variant="body1" component="div" className={classes.spacer}/>
                <Button fullWidth variant="outlined" color="primary" startIcon={<Add/>}
                        component={Link} to="/bookables/new">
                    New Bookable
                </Button>
            </Grid>
            <Grid item xs={9}>
                <BookableDetails bookable={bookable}/>
            </Grid>
        </Grid>
    );
}

export default BookablesView;