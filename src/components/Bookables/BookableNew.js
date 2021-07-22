import {
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import { 
    useNavigate 
} from "react-router";

import {
    useCreateBookable
} from "../../apis/Bookables";

import BookableForm from "./BookableForm";

const BookableNew = () => {
    const navigate = useNavigate();
    const {createBookable, error, isLoading, isError} = useCreateBookable((newBookable) => {
        navigate(`/bookables/${newBookable.id}`);
    });

    const bookable = {};

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
        <BookableForm 
            bookable={bookable}
            onSave={createBookable}
            onCancel={() => navigate(`/bookables`)}
        />
    );
}

export default BookableNew;