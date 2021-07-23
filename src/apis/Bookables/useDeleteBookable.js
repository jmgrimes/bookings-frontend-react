import {
    useMutation,
    useQueryClient
} from "react-query";

const baseUrl = "http://localhost:3001/bookables";
const useUpdateBookable = (onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const url = `${baseUrl}/${data.id}`
            const fetchOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            };
            return fetch(url, fetchOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("There was a problem deleting the bookable!");
                    }
                    return response;
                });
        },
        {
            onSuccess: (_, bookable) => {
                const bookables = queryClient.getQueryData("bookables") || [];
                queryClient.setQueryData("bookables", bookables.filter((b) => (b.id !== bookable.id)));
                onSuccess(bookable);
            }
        }
    );
    return {
        ...mutation,
        deleteBookable: mutation.mutate
    };
};

export default useUpdateBookable;