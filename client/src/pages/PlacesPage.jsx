import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import AddressLink from "../components/AddressLink";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/api/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  async function deletePlace(id) {
    try {
      await axios.delete(`/api/places/${id}`);
      setPlaces(places.filter((place) => place._id !== id));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }

  return (
    <div>
      <AccountNav />
      <h1 className="h2-bold mt-4 text-center p-4">Create your Host!</h1>
      <div className="text-center">
        <Link
          className="bg-purple-400 inline-flex gap-1 py-2 px-6 rounded-full"
          to="/account/places/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4 space-y-6 p-4">
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="flex gap-4 bg-gray-100 p-2 rounded-2xl"
            >
              <Link
                to={`/account/places/${place._id}`}
                className="flex-shrink-0"
              >
                <div className="bg-gray-500 h-32 w-32 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <Image
                      className="rounded-2xl object-cover aspect-square"
                      src={place.photos[0]}
                      alt=""
                    />
                  )}
                </div>
              </Link>
              <div className="flex-grow">
                <div
                  to={`/account/places/${place._id}`}
                  className="no-underline"
                >
                  <h2 className="p-24-bold">{place.title}</h2>
                  <p className="p-16-medium">{place.description}</p>
                </div>
                <AddressLink className="text-xl mt-2">
                  {place.address}
                </AddressLink>
                <div className="flex item-center gap-2 mt-4">
                  <button
                    className="text-red-500"
                    onClick={() => deletePlace(place._id)}
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
                  </button>
                  <Link to={`/account/places/${place._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-4 w-6 h-6"
                    >
                      <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                      <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
