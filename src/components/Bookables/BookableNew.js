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
import useFormState from "./useFormState";

const BookableNew = () => {
    const navigate = useNavigate();

    const {createBookable, error, isLoading, isError} = useCreateBookable((newBookable) => {
        navigate(`/bookables/${newBookable.id}`);
    });

    const formState = useFormState();

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
        <BookableForm formState={formState} 
            handleSubmit={() => createBookable(formState.state)}
            handleCancel={() => navigate(`/bookables`)}
        />
    );
}

export default BookableNew;