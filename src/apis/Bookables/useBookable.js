import {useQuery, useQueryClient} from "react-query";

const baseUrl = "http://localhost:3001/bookables"
const useBookable = (bookableId, options = {}) => {
    const url = `${baseUrl}/${bookableId}`;
    const queryClient = useQueryClient();
    const result = useQuery(
        ["bookables", bookableId],
        () => fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `There was a problem fetching bookables data from the bookables resource endpoint (${url}).`
                    );
                }
                return response.json();
            }),
        {
            ...options,
            initialData: queryClient.getQueryData("bookables")?.find((b) => (b.id === parseInt(bookableId, 10))),
        }
    );
    return {
        ...result,
        bookable: result.data || {}
    };
}

export default useBookable;