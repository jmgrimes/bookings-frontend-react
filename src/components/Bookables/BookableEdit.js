import { 
    CircularProgress, 
    Grid,
    Typography
} from "@material-ui/core";
import { 
    useNavigate, 
    useParams 
} from "react-router-dom";

import {
    useBookable, 
    useDeleteBookable,
    useUpdateBookable
} from "../../apis/Bookables";

import BookableForm from "./BookableForm";

const BookableEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const {
        bookable, 
        error: queryError, 
        isError: isQueryError, 
        isLoading: isQueryLoading
    } = useBookable(id);

    const {
        updateBookable, 
        error: updateError, 
        isError: isUpdateError, 
        isLoading: isUpdateLoading
    } = useUpdateBookable((bookable) => navigate(`/bookables/${bookable.id}`));

    const {
        deleteBookable,
        error: deleteError,
        isError: isDeleteError,
        isLoading: isDeleteLoading
    } = useDeleteBookable(() => navigate("/bookables"));

    const isError = isQueryError || isUpdateError || isDeleteError;
    const isLoading = isQueryLoading || isUpdateLoading || isDeleteLoading;
    const error = queryError || updateError || deleteError;

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
            onSave={updateBookable}
            onDelete={deleteBookable}
            onCancel={() => navigate(`/bookables/${id}`)}
        />
    );
}

export default BookableEdit;