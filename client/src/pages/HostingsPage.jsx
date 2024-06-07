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

  async function deleteHosting(id) {
    try {
      await axios.delete(`/api/hostings/${id}`);
      setHostings(hostings.filter(hosting => hosting._id !== id));
    } catch (error) {
      console.error("Error deleting hosting:", error);
    }
  }

  return (
    <div>
      <AccountNav />
      <h1 className="h2-bold mt-4 text-center p-4">Places that you Hosted</h1>
      <div className="container mx-auto p-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full">
          {hostings?.length > 0 &&
            hostings?.map((hosting) => (
              <div key={hosting._id} className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <Link to={`/account/hostings/${hosting._id}`}>
                  <div className="">
                    <PlaceGallery place={hosting?.place} />
                  </div>
                </Link>
                <div className="flex-grow p-2">
                  <Link to={`/account/hostings/${hosting._id}`}>
                    <h2 className="text-xl mb-2">{hosting?.place?.title}</h2>
                    <HostingDates hosting={hosting} className="text-gray-500 mb-4" />
                  </Link>
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
                    <span className="text-2xl">Total price: ${hosting?.price}</span>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="text-red-500"
                      onClick={() => deleteHosting(hosting._id)}
                    >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 inline ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.32 4.68a1.75 1.75 0 00-2.49 0 1.75 1.75 0 000 2.48L10.94 14.5l-7.11 7.32a1.75 1.75 0 002.49 2.49l7.11-7.32 7.32 7.11a1.75 1.75 0 102.49-2.49l-7.32-7.11 7.32-7.11a1.75 1.75 0 10-2.49-2.49L12 10.94 6.32 4.68z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
