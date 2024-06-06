import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import HostingDates from "../components/HostingDates";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../components/PlaceGallery";

export default function HostingsPage() {
  const [hostings, setHostings] = useState([]);
  
  useEffect(() => {
    axios.get("/api/hosting").then((response) => {
      setHostings(response.data);
    });
  }, []);
  
  return (
    <div>
      <AccountNav />
      <h1 className="h2-bold mt-4 text-center p-4">Places that you Hosted</h1>
      <div className="container mx-auto p-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full">
        {hostings?.length > 0 &&
          hostings?.map((hosting) => (
            <Link
              key={hosting._id}
              to={`/account/hostings/${hosting._id}`}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="">
                <PlaceGallery place={hosting?.place} />
              </div>
              <div className="flex-grow p-2">
                <h2 className="text-xl mb-2">{hosting.place?.title}</h2>
                <HostingDates
                  hosting={hosting}
                  className="text-gray-500 mb-4"
                />
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-2xl">
                    Total price: ${hosting?.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      </div>
    </div>
  );
};
