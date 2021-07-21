import {
    Button,
    CircularProgress,
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
    const bookable = bookables.find((b) => b.id === parseInt(id, 10)) || bookables[0];
    const getUrl = (id) => (`/bookables/${id}`);

    if (isError) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p">{error.message}</Typography>
                </Grid>
            </Grid>
        );
    }

    if (isLoading) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        );
    }

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