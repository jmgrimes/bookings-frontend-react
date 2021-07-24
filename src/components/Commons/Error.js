import {
    Grid, makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    jumbotron: {
        marginTop: 75
    }
}));

const Error = ({error, jumbotron = false}) => {
    const classes = useStyles();
    return (
        <Grid container
              alignItems="center"
              justifyContent="center"
              className={jumbotron ? classes.jumbotron : ""}
              spacing={3}>
            <Typography variant="body1" component="p">{error.message}</Typography>
        </Grid>
    );
};

export default Error;