import {
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    jumbotron: {
        minHeight: "50vh"
    }
}));

const Error = ({error}) => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={3} className={classes.jumbotron}>
            <Typography variant="body1" component="p">{error.message}</Typography>
        </Grid>
    );
};

export default Error;