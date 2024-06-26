import google from "../assets/google.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function OAuth() {
  const auth = getAuth(app);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleGoogleLogin(ev) {
    ev.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const {data} = await axios.post('/api/google', {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        photoURL: resultsFromGoogle.user.photoURL,
      });
      alert('Login successful.');
      setUser(data);
      setRedirect(true);
    } catch (e) {
      alert('Login failed. Please try again later');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-center flex-center py-1  text-gray-200">
      <button className="underline flex gap-2 shadow-lg rounded-lg border border-gray-200 p-4 text-black"
        onClick={handleGoogleLogin}>
        Login with Google
        <img src={google} alt="Google" className="w-6 h-6 mr-2" />
      </button> 
    </div>
  );
}
