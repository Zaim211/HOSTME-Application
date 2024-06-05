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
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get("/api/profile");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setReady(true);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
