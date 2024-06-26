import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [redirect, setRedirect] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    async function handleSubmit(ev) {
        ev.preventDefault();
        setMessage("");
        setEmailError("");

        if (!validateEmail(email)) {
            setEmailError("Your email is not valid");
            return;
        }

        if (newPassword !== repeatPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('/api/reset-password', {
                email,
                newPassword
            });
            setMessage("Password reset successfully");
            console.log("Password reset response:", response.data);
            setRedirect(true);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setEmailError("Email not found");
            } else {
                setMessage(error.response?.data || "An error occurred. Please try again.");
            }
        }
    }

    if (redirect) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="mt-8 grow flex-center">
            <div className="mb-60">
                <h1 className="h1-semibold text-center mb-4">Reset Password</h1>
                <form className="max-w-md mx-auto p-6 space-y-2" onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    {emailError && <div className="text-red-500">{emailError}</div>}
                    
                    <input
                        className="input-field"
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={ev => setNewPassword(ev.target.value)}
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Repeat New Password"
                        value={repeatPassword}
                        onChange={ev => setRepeatPassword(ev.target.value)}
                    />
                    <button className="submit-button">Reset Password</button>
                    {message && <div className="text-center py-2 text-gray-500">{message}</div>}
                </form>
            </div>
        </div>
    );
}
