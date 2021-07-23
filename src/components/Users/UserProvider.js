import {
    createContext,
    useContext,
    useState
} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={user}>
            <UserSetContext.Provider value={setUser}>
                {children}
            </UserSetContext.Provider>
        </UserContext.Provider>
    );
};

const useUser = () => {
    const user = useContext(UserContext);
    const setUser = useContext(UserSetContext);
    if (!setUser) {
        throw new Error("The UserProvider is missing.");
    }
    return [user, setUser];
}

export default UserProvider;
export {
    useUser
};