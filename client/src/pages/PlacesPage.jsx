import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
// import PlaceImg from "../components/PlaceImg";
import axios from "axios";
import Image from "../components/Image";
import AddressLink from "../components/AddressLink";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/api/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);
  
  return (
    <div>
      <AccountNav />
      <h1 className="h2-bold mt-4 text-center p-4">Create your Host!</h1>
      <div className="text-center">
        <Link
          className="bg-purple-400 inline-flex gap-1 py-2 
        px-6 rounded-full"
          to={"/account/places/new"}
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
      
      <div className="mt-4 space-y-6 flex-row-4 p-4 ">
        {places?.length > 0 && places?.map((place) => (
          <Link key={place._id} to={'/account/places/'+place._id} 
          className="flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl">
           <div className="bg-gray-500 mb-2 h-32 w-32 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square"  key={place} src={place.photos?.[0]} alt=""/>
            )}
          </div>
            <div className="">
              <h2 className="p-24-bold">{place?.title}</h2>
              <p className="p-16-medium">{place?.description}</p>
              <AddressLink className="text-xl mt-10">{place?.address}</AddressLink>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
