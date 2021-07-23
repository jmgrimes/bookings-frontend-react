import {
    useQuery,
    useQueryClient
} from "react-query";

const baseUrl = "http://localhost:3001/bookables"
const useBookable = (bookableId, transform = bookable => bookable) => {
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
            initialData: queryClient.getQueryData("bookables")?.find((b) => (b.id === parseInt(bookableId, 10)))
        }
    );
    return {
        ...result,
        bookable: transform(result.data || {})
    };
}

export default useBookable;