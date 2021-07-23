import {
    useMutation,
    useQueryClient
} from "react-query";

const url = "http://localhost:3001/bookables";
const useCreateBookable = (onSuccess = () => {}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        data => {
            const fetchOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            };
            return fetch(url, fetchOptions)
                .then(response => {
                if (!response.ok) {
                    throw new Error("There was a problem creating the bookable!");
                }
                return response.json();
            });
        },
        {
            onSuccess: newBookable => {
                queryClient.setQueryData(
                    "bookables",
                    (old) => [ ...(old || []), newBookable]
                );
                onSuccess(newBookable);
            }
        }
    );
    return {
        ...mutation,
        createBookable: mutation.mutate
    };
};

export default useCreateBookable;