import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/listings").then((response) => {
      setListings([...response.data]);
    });
  }, []);

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
 strokeLinejoin="round"
                strokeWidth="2"
 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            autoComplete="none"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            id="city-search"
            className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
            placeholder="جستجوی شهر ، استان یا افامتگاه"
          />
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 rtl-direction">
        {filteredListings.length > 0 &&
          filteredListings
            .slice(0)
            .reverse()
            .map((listing, index) => (
              <Link
                to={"/listing/" + listing._id}
 key={index}
                className="bg-white border rounded-xl flex flex-col"
              >
                {listing.images?.[0] && (
                  <img
                    className="rounded-t-xl object-cover h-48"
                    src={"http://localhost:4000/uploads/" + listing.images?.[0]}
                    alt=""
                  />
                )}
                <div className="p-3 flex-grow">
                  <h3 className="font-bold text-right text-lg text-medium light rtl-direction mt-1">
                    {listing.type} | {listing.city}
                  </h3>
                  <h2 className="text-sm truncate text-gray-500 rtl-direction text-right mt-1">
                    {listing.title}
                  </h2>
                  <div className="mt-1 pricing-main m-none">
                    <span className="text-xs text-normal">شروع قیمت از</span>
                    <span className="text-sm font-bold">
                      {" "}
                      {listing.price} تومان{" "}
                    </span>
                    <span className="text-xs text-normal">/ هرشب</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
