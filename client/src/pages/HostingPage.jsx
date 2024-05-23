import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import HostingDates from "../components/HostingDates";

export default function HostingPage() {
  const { id } = useParams();
  const [hosting, setHosting] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/api/hosting").then((response) => {
        const foundHosting = response.data.find(({ _id }) => _id === id);
        if (foundHosting) {
          setHosting(foundHosting);
        }
      });
    }
  }, [id]);

  if (!hosting) {
    return "";
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 w-full">
      <h1 className="text-3xl">{hosting.place.title}</h1>
      <AddressLink className="my-2 block">
        {hosting?.place?.address}
      </AddressLink>
      <p className="p-16-medium mt-4">{hosting.place.description}</p>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="mb-2 h2-bold">Your hosting information:</h2>
          <HostingDates hosting={hosting} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${hosting.price}
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
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
          </div>
        </div>
      </div>
      <PlaceGallery place={hosting.place} />
      </div>
    </div>
  );
}

