import {DateTime} from "luxon";
import {useSearchParams} from "react-router-dom";

const useBookingsParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dateParam = DateTime.fromISO(searchParams.get("date"));
    const date = dateParam.isValid ? dateParam : DateTime.now();
    const week = {
        date,
        start: date.startOf("week"),
        end: date.endOf("week")
    };

    const bookableIdParam = parseInt(searchParams.get("bookableId"), 10);
    const bookableId = !isNaN(bookableIdParam) ? bookableIdParam : undefined;

    const setBookingsDate = date => {
        const params = {};
        if (bookableId) {
            params.bookableId = bookableId;
        }
        if (DateTime.isDateTime(date)) {
            params.date = date.toISODate();
        }
        if (params.date || params.bookableId !== undefined) {
            setSearchParams(params, {replace: true});
        }
    }

    return {
        date,
        week,
        bookableId,
        setBookingsDate
    };
};

export default useBookingsParams;