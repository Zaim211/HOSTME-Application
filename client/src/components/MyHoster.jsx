import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "./PlaceGallery";
import HostingDates from "./HostingDates";

export default function HostingsPage() {
  const [hostings, setHostings] = useState([]);

  useEffect(() => {
    axios.get("/api/hosted").then((response) => {
      setHostings(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full">
        {hostings?.length > 0 &&
          hostings.map((hosting) => (
            <div
              key={hosting._id}
              to={`/account/hostings/${hosting._id}`}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="h-30">
                <PlaceGallery place={hosting.place} />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{hosting.place.title}</h2>
                <div className="wrap m-2 border border-gray-300 shadow-lg p-4">
                  <p className="h1-bold mb-2">Information about Gests:</p>
                  <div className="text-sm text-gray-600 mt-2">Hosted by:</div>
                  <div className="ml-2 font-semibold">
                    <span className="p-20-semibold">Name:</span> {'  '}
                     {hosting.name}
                  </div>
                  <div className="ml-2 font-semibold">
                  <span className="p-20-semibold">Phone:</span> {'  '}
                    {hosting.phone}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-600">Total price:</div>
                  <div className="ml-2 text-lg font-semibold">${hosting.price}</div>
                </div>
                    <HostingDates hosting={hosting} className="text-sm text-gray-600" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
