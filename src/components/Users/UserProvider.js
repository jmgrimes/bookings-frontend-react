import {
    useState
} from "react";
import {
    UserContext,
    UserSetContext
} from "./useUser";

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

export default UserProvider;