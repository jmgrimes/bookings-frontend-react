import {
    useNavigate
} from "react-router-dom";

import BookableForm from "./BookableForm";
import useCreateBookable from "./useCreateBookable";

const BookableNew = () => {
    const navigate = useNavigate();
    const {createBookable} = useCreateBookable(bookable => navigate(`/bookables/${bookable.id}`));

    return (
        <BookableForm 
            bookable={{}}
            onSave={createBookable}
            onCancel={() => navigate(`/bookables`)}
        />
    );
}

export default BookableNew;