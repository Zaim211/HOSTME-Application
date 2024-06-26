import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import NavMobile from "./NavMobile";
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  const { user, ready } = useContext(UserContext);

  const isMobileDevice = useMediaQuery({ query: '(max-width: 768px)' });

  if (isMobileDevice) {
    return (
      <header className="wrapper mt-12 border-b">
        <NavMobile />
      </header>
    );
  }

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link to={"/"} className="w-36">
          <img src={logo} alt="logo" width={150} height={28} />
        </Link>
        <div className="flex-between-center mt-1">
          <Link to={user ? '/account' : '/login'} className="h2-bold inline-flex m-1">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
            Profile
          </Link>
          <div className="border-l border-gray-300"></div>
          <Link to={user ? '/account/hostings' : '/login'} className="h2-bold inline-flex m-1">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Listings
        </Link>
          <div className="border-l border-gray-300"></div>
          <Link to={user ? '/account/places' : '/login'} className="h2-bold inline-flex m-1">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        Add Places
        </Link>
        </div>

        <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 mb-2 border border-gray-300 rounded-full py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          {ready && user ? (
            <div className="flex gap-2">
              <img
                src={user.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="h2-bold">{user.name}</div>
            </div>
          ) : (
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
