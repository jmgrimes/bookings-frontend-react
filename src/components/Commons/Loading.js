import {
    CircularProgress,
    Grid,
    Typography,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    message: {
        marginLeft: 10
    },
    jumbotron: {
        marginTop: 75
    }
}));

const Loading = ({message, jumbotron = false}) => {
    const classes = useStyles();
    return (
        <Grid container
              alignItems="center"
              justifyContent="center"
              className={jumbotron ? classes.jumbotron : ""}
              spacing={3}>
            <CircularProgress />
            <Typography variant="body1" component="div" className={classes.message}>{message}</Typography>
        </Grid>
    );
};

export default Loading;