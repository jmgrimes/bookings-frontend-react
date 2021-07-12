import {
  createContext,
  useContext,
  useState
} from "react";

const CurrentUserContext = createContext();
const CurrentUserSetContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState();

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <CurrentUserSetContext.Provider value={ setCurrentUser }>
        { children }
      </CurrentUserSetContext.Provider>
    </CurrentUserContext.Provider>
  );
};

const useCurrentUser = () => {
  const user = useContext(CurrentUserContext);
  const setUser = useContext(CurrentUserSetContext);

  if (!setUser) {
    throw new Error("The CurrentUserProvider is missing.");
  }
  return [ user, setUser ];
}

export default useCurrentUser;
export {
  CurrentUserProvider
};