import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import OAuth from "../components/OAuth";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function loginUser(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post("/api/login", { email, password });
            setUser(data);
            alert("User logged in successfully");
            setRedirect(true);
        } catch (error) {
            alert("Login failed. Please try again.");
        }
    }
    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="mt-8 grow flex-center">
            <div className="mb-60">
                <h1 className="h1-semibold text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto p-6 space-y-2" onSubmit={loginUser}>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="submit-button">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        <Link className="underline  text-black" to={"/forgot-password"}>
                            Forgot Password?
                        </Link>
                    </div>
                    <OAuth  />
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?{" "}
                        <Link className="underline text-black" to={"/register"}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

