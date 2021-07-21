import {
    useEffect,
    useState
} from "react";

const useFormState = (data) => {
    const [state, setState] = useState(data);

    useEffect(
        () => {
            if (data) {
                setState(data);
            }
        },
        [data]
    );

    function handleChange (event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    function handleChecked (event) {
        const {name, value, checked} = event.target;
        const values = new Set(state[name]);
        const intValue = parseInt(value, 10);

        values.delete(intValue);
        if (checked) values.add(intValue);

        setState({
            ...state,
            [name]: [...values]
        });
    }

    return {
        state,
        handleChange,
        handleChecked
    };
};

export default useFormState;