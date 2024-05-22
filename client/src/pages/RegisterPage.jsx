import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
      setRedirect(true);
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto p-6 space-y-2" onSubmit={registerUser}>
          <input type="text"
                 className="input-field"
                 placeholder="Your name"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 className="input-field"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input
            className="input-field"
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="submit-button">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}