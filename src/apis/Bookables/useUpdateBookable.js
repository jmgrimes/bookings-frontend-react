import {useMutation, useQueryClient} from "react-query";

const baseUrl = "http://localhost:3001/bookables";
const useUpdateBookable = (onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const url = `${baseUrl}/${data.id}`
            const fetchOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            };
            return fetch(url, fetchOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("There was a problem updating the bookable!");
                    }
                    return response.json();
                });
        },
        {
            onSuccess: bookable => {
                const bookables = queryClient.getQueryData("bookables") || [];
                const bookableIndex = bookables.findIndex(b => b.id === bookable.id);
                if (bookableIndex !== -1) {
                    bookables[bookableIndex] = bookable;
                    queryClient.setQueryData("bookables", bookables);
                }
                queryClient.setQueryData(["bookables", bookable.id], bookable);
                onSuccess(bookable);
            }
        }
    );
    return {
        ...mutation,
        updateBookable: mutation.mutate
    };
};

export default useUpdateBookable;