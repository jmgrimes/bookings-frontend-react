import {
  createContext,
  useState
} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState();

  return (
    <UserContext.Provider value={ user }>
      <UserSetContext.Provider value={ setUser }>
        { children }
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
};

export {
  UserContext,
  UserProvider,
  UserSetContext
};