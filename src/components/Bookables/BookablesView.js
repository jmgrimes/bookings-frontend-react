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
    isError,
    isLoading
} from "../../utils/apis";

import BookableDetails from "./BookableDetails";
import BookablesList from "./BookablesList";
import useBookables from "./useBookables";

const useStyles = makeStyles((theme) => ({
    spacer: {
        marginBottom: 10
    }
}));

const BookablesView = () => {
    const classes = useStyles();

    const {id} = useParams();
    const {bookables, error, status} = useBookables();
    const bookable = bookables.find((b) => b.id === parseInt(id, 10)) || bookables[0];

    if (isError(status)) {
        return (
            <Grid container alignContent="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p">{error.message}</Typography>
                </Grid>
            </Grid>
        );
    }

    if (isLoading(status)) {
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
                <BookablesList
                    bookable={bookable}
                    bookables={bookables}
                    getUrl={(id) => (`/bookables/${id}`)}/>
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