import {
    useNavigate, 
    useParams 
} from "react-router-dom";

import {
    Error,
    Loading
} from "../Commons";
import {
    useBookable, 
    useDeleteBookable,
    useUpdateBookable
} from "../../apis/Bookables";

import BookableForm from "./BookableForm";

const BookableEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
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
    } = useUpdateBookable(bookable => navigate(`/bookables/${bookable.id}`));

    const {
        deleteBookable,
        error: deleteError,
        isError: isDeleteError,
        isLoading: isDeleteLoading
    } = useDeleteBookable(() => navigate("/bookables"));

    const isError = isQueryError || isUpdateError || isDeleteError;
    const isLoading = isQueryLoading || isUpdateLoading || isDeleteLoading;
    const error = queryError || updateError || deleteError;

    if (isLoading) return (
        <Loading/>
    );

    if (isError) return (
        <Error error={error}/>
    );

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