import React from "react";

const UserContext = React.createContext();
const UserSetContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = React.useState();
    return (
        <UserContext.Provider value={user}>
            <UserSetContext.Provider value={setUser}>
                {children}
            </UserSetContext.Provider>
        </UserContext.Provider>
    );
};

const useUser = () => {
    const user = React.useContext(UserContext);
    const setUser = React.useContext(UserSetContext);
    if (!setUser) {
        throw new Error("The UserProvider is missing.");
    }
    return [user, setUser];
}

export default UserProvider;
export {
    useUser
};