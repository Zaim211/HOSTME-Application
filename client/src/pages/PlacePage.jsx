import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import { useEffect, useState } from "react";
import axios from "axios";
import HostingWidget from "../components/HostingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      setPlace(response?.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }
  return (
    <div className="mt-8 bg-gray-100 p-4">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <span className="p-16-medium">Check-in:</span>{' '}
          {place.checkIn}
          <br />
          <span className="p-16-medium">Check-out:</span>{' '}
           {place.checkOut}
          <br />
          <span className="p-16-medium">Max number of guests:</span>{' '}
          {place.maxGuests}
        </div>
        <div><HostingWidget place={place} /></div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};
