import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the UserContext
export const UserContext = createContext({});

// Create the UserContextProvider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/api/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
