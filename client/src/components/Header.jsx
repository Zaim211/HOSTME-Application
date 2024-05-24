import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import logo from "../assets/logo.svg";

export default function NavMobile() {
  const { user } = useContext(UserContext);
  const [showHeader, setShowHeader] = useState(false);

  // Function to toggle the visibility of the header
  const toggleHeader = () => {
    setShowHeader(!showHeader);
  };

  // Function to hide the header when clicking on a menu item
  const hideHeader = () => {
    setShowHeader(false);
  };

  return (
    <nav className={showHeader ? "bg-primary" : "bg-transparent"}>
      <div className="fixed top-0 right-4 flex flex-col justify-center items-end p-4">
        {/* Button to toggle the visibility of the header */}
        <button className="text-xl" onClick={toggleHeader}>
          {showHeader ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          )}
        </button>
        {showHeader && (
          <nav className="flex flex-col mt-2 p-4 items-end bg-gray-600 rounded-2xl">
            <Link to={"/account"} className="my-2" onClick={hideHeader}>
              Profile
            </Link>
            <div className="border-b border-gray-300 w-full my-2"></div>
            <Link to={"/account/hostings"} className="my-2" onClick={hideHeader}>
              Your Host
            </Link>
            <div className="border-b border-gray-300 w-full my-2"></div>
            <Link to={"/account/places"} className="my-2" onClick={hideHeader}>
              Add Places
            </Link>
            <div className="border-b border-gray-300 w-full my-2"></div>
            <Link
              to={user ? "/account" : "/login"}
              className="flex items-center gap-2 mb-2 border border-gray-300 rounded-full py-2 px-4"
              onClick={hideHeader}
            >
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
              {!!user && <div className="h2-bold">{user.name}</div>}
            </Link>
          </nav>
        )}
      </div>
      <div className="fixed top-0 left-0 flex flex-col justify-center items-end p-2">
        <Link to={"/"} className="mt-2 md:p2">
          <img src={logo} alt="logo" width={120} height={40} />
        </Link>
      </div>
    </nav>
  );
}
