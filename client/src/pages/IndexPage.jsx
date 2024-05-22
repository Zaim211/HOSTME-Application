// import Image from "../components/Image";
// import { Link } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import hero from "../assets/hero.png";
// import { UserContext } from "../UserContext";

// export default function IndexPage() {
//   const [places, setPlaces] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [originalPlaces, setOriginalPlaces] = useState([]);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     axios.get("/places").then((response) => {
//       setPlaces(response.data);
//       setOriginalPlaces(response.data);
//     });
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setPlaces(originalPlaces);
//     }
//   }, [searchQuery, originalPlaces]);

//   const handleSearch = () => {
//     if (searchQuery.trim() === "") {
//       setPlaces(originalPlaces);
//     } else {
//       axios
//         .get(`/places?search=${searchQuery}`)
//         .then((response) => {
//           setPlaces(response.data);
//         })
//         .catch((error) => {
//           console.error("Error searching places:", error);
//         });
//     }
//   };

//   return (
//     <>
//       <div className="p-0 mt-4 md:py-10">
//         <div className="wrapper grid grid-cols-1 gap-20 md:grid-cols-2 2xl:gap-0">
//           <div className="flex flex-col justify-center gap-8">
//             <h1 className="text-3xl font-bold">
//               Welcome to the best place to stay
//             </h1>
//             <p className="p-20-regular md:p-regular-24">
//               HOST-ME is an innovative platforme that reimagines the concept of
//               hosting guests in residential spaces.
//               <br />and Ony for hostles!
//             </p>
//             <button className="button sm:w-fit">
//               <Link to={user ? "/account/places" : "/login"}>HOST Now!</Link>
//             </button>
//           </div>
//           <div className="max-w-full order-2 md:order-1">
//             <img
//               src={hero}
//               alt="hero"
//               width={1400}
//               height={1000}
//               className="max-h-[90vh]w-full object-contain 2xl:max-h-[50vh]"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative flex-grow md:w-full mt-6 mx-2">
//         <div className="relative flex items-center border p-2 rounded-2xl">
//           <input
//             type="text"
//             placeholder="Search your destination..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyUp={handleSearch}
//             className="w-full p-2 border-none focus:ring-0"
//           />
//           <button onClick={handleSearch} className="absolute right-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4">
//         {places?.length > 0 &&
//           places.map((place, index) => (
//             <Link to={user ? "/place/" + place._id : "/login"} key={index}>
//               <div className="bg-gray-500 mb-2 rounded-2xl flex">
//                 {place.photos?.[0] && (
//                   <Image
//                     className="rounded-2xl object-cover aspect-square"
//                     key={place}
//                     src={place.photos?.[0]}
//                     alt=""
//                   />
//                 )}
//               </div>
//               <h2 className="font-bold">{place.address}</h2>
//               <h3 className="text-sm text-gray-500">{place.title}</h3>
//               <div className="mt-1">
//                 <span className="font-bold">${place.price}</span> per night
//               </div>
//             </Link>
//           ))}
//       </div>
//     </>
//   );
// }

import Image from "../components/Image";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import hero from "../assets/hero.png";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const { user } = useContext(UserContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 3;

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      setOriginalPlaces(response.data);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setPlaces(originalPlaces);
    }
  }, [searchQuery, originalPlaces]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setPlaces(originalPlaces);
    } else {
      axios
        .get(`/places?search=${searchQuery}`)
        .then((response) => {
          setPlaces(response.data);
        })
        .catch((error) => {
          console.error("Error searching places:", error);
        });
    }
  };

  // Calculate current places
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  // Pagination controls
  const totalPages = Math.ceil(places.length / placesPerPage);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="p-0 mt-4 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-20 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-3xl font-bold">
              Welcome to the best place to stay
            </h1>
            <p className="p-18-semibold md:p-regular-24">
              HOST-ME is an innovative platforme that reimagines the concept of
              hosting guests in residential spaces.
              <br />
              Only for hostles!
            </p>
            <button className="button sm:w-fit">
              <Link to={user ? "/account/places" : "/login"}>HOST Now!</Link>
            </button>
          </div>
          <div className="max-w-full order-2 md:order-1">
            <img
              src={hero}
              alt="hero"
              width={1200}
              height={1000}
              className="max-h-[90vh]w-full object-contain 2xl:max-h-[50vh]"
            />{" "}
          </div>
        </div>
      </div>

      <div className="relative flex-grow md:w-full mt-6 mx-2">
        <div className="relative flex items-center border p-2 rounded-2xl">
          <input
            type="text"
            placeholder="Search your destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleSearch}
            className="w-full p-2 border-none focus:ring-0"
          />
          <button onClick={handleSearch} className="absolute right-2">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4">
        {currentPlaces?.length > 0 &&
          currentPlaces.map((place, index) => (
            <Link to={user ? "/place/" + place._id : "/login"} key={index}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    key={place}
                    src={place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>

      <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`px-4 py-2 mx-1 ${
              index + 1 === currentPage
                ? "bg-purple-500 text-white"
                : "bg-white text-black border border-gray-300"
            } rounded-full`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
