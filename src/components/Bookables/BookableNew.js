import {useNavigate} from "react-router";

import BookableForm from "./BookableForm";
import {useCreateBookable} from "../../apis/Bookables";

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