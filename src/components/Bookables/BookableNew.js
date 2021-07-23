import {
    useNavigate 
} from "react-router";

import {
    Error,
    Loading
} from "../Commons";
import {
    useCreateBookable
} from "../../apis/Bookables";

import BookableForm from "./BookableForm";


const BookableNew = () => {
    const navigate = useNavigate();
    const {createBookable, error, isLoading, isError} = useCreateBookable(bookable => {
        navigate(`/bookables/${bookable.id}`);
    });

    const bookable = {};

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={error}/>;

    return (
        <BookableForm 
            bookable={bookable}
            onSave={createBookable}
            onCancel={() => navigate(`/bookables`)}
        />
    );
}

export default BookableNew;