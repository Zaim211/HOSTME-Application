import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useLocation } from "react-router-dom";
import AccountNav from "../components/AccountNav.jsx";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import MyHoster from "../components/MyHoster";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/api/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mb-6">
      <AccountNav />
      {subpage === "profile" && (
        <div className="mt-8 text-center mx-auto">
          Welcome <span className="h2-bold">{user.name}</span> to our <span className="h2-bold">Platforme</span>
          <br />
          <h1 className="h2-bold mt-8">Clients Hosted Your Places, Please contact them!</h1>
          <MyHoster />
          <br />
          <button className="submit-button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};
