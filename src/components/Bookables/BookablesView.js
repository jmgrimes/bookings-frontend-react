import {
    Button,
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Add
} from "@material-ui/icons";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

import BookableDetails from "./BookableDetails";
import BookablesList from "./BookablesList";
import {useBookables} from "../../apis/Bookables";

const useStyles = makeStyles(() => ({
    spacer: {
        marginBottom: 10
    }
}));

const BookablesView = () => {
    const classes = useStyles();

    const {id} = useParams();
    const {bookables} = useBookables({suspense: true});
    const bookable = bookables.find(b => b.id === parseInt(id, 10)) || bookables[0];
    const getUrl = id => (`/bookables/${id}`);

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <BookablesList bookable={bookable} bookables={bookables} getUrl={getUrl}/>
                <Typography variant="body1" component="div" className={classes.spacer}/>
                <Button fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<Add/>}
                        component={Link}
                        to="/bookables/new">
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