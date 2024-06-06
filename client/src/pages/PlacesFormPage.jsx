import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import { Navigate, useParams } from "react-router-dom";
import ImagesUploder from "../components/ImagesUploder";
import axios from "axios";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data?.title);
      setAddress(data?.address);
      setAddedPhotos(data?.photos);
      setDescription(data?.description);
      setPerks(data?.perks);
      setExtraInfo(data?.extraInfo);
      setCheckIn(data?.checkIn);
      setCheckOut(data?.checkOut);
      setMaxGuests(data?.maxGuests);
      setPrice(data?.price);
    });
  }, [id]);

  function inputHeader(text, required = false) {
    return (
      <h2 className="text-2xl mt-4">
        {text} {required && <span className="text-red-500">*</span>}
      </h2>
    );
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description, required = false) {
    return (
      <>
        {inputHeader(header, required)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/api/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/api/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className="mb-7 mr-2 m-2">
        <p className="text-red-500 mb-4">All fields marked with (*) are required.</p>
        
        {preInput(
          "Title",
          "Title for your place. It should be short and catchy as in advertisement.",
          true
        )}
        <input
          type="text"
          className="input-field"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title, for example: My lovely apt"
          required
        />

        {preInput("Address", "Address to this place", true)}
        <input
          type="text"
          value={address}
          className="input-field"
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
          required
        />
        
        {preInput("Photos", "More photos = better", true)}
        <ImagesUploder addedPhotos={addedPhotos} onChange={setAddedPhotos} required />
        <input type="file" style={{ display: "none" }} required />

        {preInput("Description", "Description of the place", true)}
        <textarea
          value={description}
          className="textarea-field"
          onChange={(ev) => setDescription(ev.target.value)}
          required
        />

        {preInput("Perks", "Select all the perks of your place", true)}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} required />
        </div>

        {preInput("Extra info", "House rules, etc", true)}
        <textarea
          value={extraInfo}
          className="textarea-field"
          onChange={(ev) => setExtraInfo(ev.target.value)}
          required
        />
        <input type="text" style={{ display: "none" }} required />
        {preInput(
          "Check-in & Check-out times",
          "Add check-in and check-out times, remember to have some time window for cleaning the room between guests.",
          true
        )}
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input
              type="text"
              className="input-field"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              type="text"
              className="input-field"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              className="input-field"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              className="input-field"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              required
            />
          </div>
        </div>

        <button className="submit-button mt-4" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
