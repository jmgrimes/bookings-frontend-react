import {
    CircularProgress,
    Grid,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    jumbotron: {
        minHeight: "50vh"
    }
}));

const Error = () => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={3} className={classes.jumbotron}>
            <CircularProgress />
        </Grid>
    );
};

export default Error;