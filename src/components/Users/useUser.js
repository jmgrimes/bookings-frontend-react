import {
  createContext,
  useContext
} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

const useUser = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);
  if (!setUser) {
      throw new Error("The UserProvider is missing.");
  }
  return [user, setUser];
};

export default useUser;
export {
  UserContext,
  UserSetContext
};