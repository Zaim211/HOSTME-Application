// import {Link, Navigate} from "react-router-dom";
// import {useState} from "react";
// import axios from "axios";
// import PhotoProfile from "../components/PhotoProfile";


// export default function RegisterPage() {
//   const [name,setName] = useState('');
//   const [email,setEmail] = useState('');
//   const [password,setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const [addedPhotos, setAddedPhotos] = useState([]);
//   async function registerUser(ev) {
//     ev.preventDefault();
//     try {
//       await axios.post('/api/register', {
//         name,
//         email,
//         password,
//         addedPhotos
//       });
//       alert('Registration successful. Now you can log in');
//       setRedirect(true);
//     } catch (e) {
//       alert('Registration failed. Please try again later');
//     }
//   }
//   if (redirect) {
//     return <Navigate to={'/login'} />;
//   }

//   return (
//     <div className="mt-6 grow flex items-center justify-around">
//       <div className="mb-64">
//         <h1 className="text-4xl text-center mb-4">Register</h1>
//         <form className="max-w-md mx-auto p-8 space-y-2" onSubmit={registerUser}>
//           <PhotoProfile addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
//           <input type="text"
//                  className="input-field mt-2"
//                  placeholder="Your name"
//                  value={name}
//                  onChange={ev => setName(ev.target.value)} />

//           <input type="email"
//                  className="input-field"
//                  placeholder="your@email.com"
//                  value={email}
//                  onChange={ev => setEmail(ev.target.value)} />
//           <input
//             className="input-field"
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={ev => setPassword(ev.target.value)}
//           />
//           <button className="submit-button">Register</button>
//           {/* <OAuth  /> */}
//           <div className="text-center py-2 text-gray-500">
//             Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import zxcvbn from 'zxcvbn';
import PhotoProfile from "../components/PhotoProfile";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  }, [password]);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
        addedPhotos
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

  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-700'];
  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto p-8 space-y-2" onSubmit={registerUser}>
          <PhotoProfile addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <input 
            type="text"
            className="input-field mt-2"
            placeholder="Your name"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input 
            type="email"
            className="input-field"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          
          <div className="flex items-center">
            <div className={`h-3 flex-grow rounded-full ${strengthColor[passwordStrength]}`}></div>
            <span className="ml-2">{strengthLabel[passwordStrength]}</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            Use at least 8 characters, a mix of letters, numbers, and symbols.
          </div>
          
          <button className="submit-button">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
