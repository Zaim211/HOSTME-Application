// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import PlaceGallery from "./PlaceGallery";
// import HostingDates from "./HostingDates";

// export default function HostingsPage() {
//   const [hostings, setHostings] = useState([]);

//   useEffect(() => {
//     axios.get("/hosted").then((response) => {
//       setHostings(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       <div className="p-4">
//         {hostings?.length > 0 &&
//           hostings.map((hosting) => (
//             <Link
//               key={hosting._id}
//               to={`/account/hostings/${hosting._id}`}
//               className="flex bg-gray-200 rounded-2xl overflow-hidden mt-2 space-y-8 flex-row-2 p-2"
//             >
//               <div className="w-50 mt-4">
//                 <PlaceGallery place={hosting.place} />
//               </div>
//               <div className="grow">
//                 <h2 className="h2-bold mt-0">{hosting.place.title}</h2>
//                 <div className="text-xl">
//                   <HostingDates
//                     hosting={hosting}
//                     className="mb-2 mt-4 text-gray-500"
//                   />
//                   <div className="flex">
//                     <div>
//                       Name:<h2 className="h2-bold">{hosting.name}</h2>
//                       Phone: <p className="p-20-semibold">{hosting.phone}</p>
//                     </div>
//                     <div>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="w-8 h-8"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
//                         />
//                       </svg>
//                       <span className="text-2xl">
//                         Total price: ${hosting.price}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "./PlaceGallery";
import HostingDates from "./HostingDates";

export default function HostingsPage() {
  const [hostings, setHostings] = useState([]);

  useEffect(() => {
    axios.get("/hosted").then((response) => {
      setHostings(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full">
        {hostings?.length > 0 &&
          hostings.map((hosting) => (
            <Link
              key={hosting._id}
              to={`/account/hostings/${hosting._id}`}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="h-30">
                <PlaceGallery place={hosting.place} />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{hosting.place.title}</h2>
                <div className="flex items-center mb-2">
                  <div className="text-sm text-gray-600">Hosted by:</div>
                  <div className="ml-2 font-semibold">{hosting.name}</div>
                  <div className="ml-2 font-semibold">{hosting.phone}</div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-600">Total price:</div>
                  <div className="ml-2 text-lg font-semibold">${hosting.price}</div>
                </div>
                    <HostingDates hosting={hosting} className="text-sm text-gray-600" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

