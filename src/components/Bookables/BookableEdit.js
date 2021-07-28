import {
    useNavigate, 
    useParams
} from "react-router-dom";

import BookableForm from "./BookableForm";
import Error from "../Commons/Error";
import Loading from "../Commons/Loading";
import useBookable from "./useBookable";
import useDeleteBookable from "./useDeleteBookable";
import useUpdateBookable from "./useUpdateBookable";

const BookableEdit = () => {
    console.log("BookableEdit");
    const navigate = useNavigate();

    const {id} = useParams();
    const {bookable} = useBookable(id, {suspense: true});
    const {
        updateBookable,
        error: updateError,
        isError: isUpdateError,
        isLoading: isUpdating
    } = useUpdateBookable(bookable => navigate(`/bookables/${bookable.id}`));
    const {
        deleteBookable,
        error: deleteError,
        isError: isDeleteError,
        isLoading: isDeleting
    } = useDeleteBookable(() => navigate("/bookables"));

    if (isUpdating) return <Loading message="Updating bookable..."/>;
    if (isUpdateError) return <Error error={updateError}/>;

    if (isDeleting) return <Loading message="Deleting bookable..."/>;
    if (isDeleteError) return <Error error={deleteError}/>;

    return (
        <BookableForm bookable={bookable}
                      onSave={updateBookable}
                      onDelete={deleteBookable}
                      onCancel={() => navigate(`/bookables/${id}`)}/>
    );
}

export default BookableEdit;