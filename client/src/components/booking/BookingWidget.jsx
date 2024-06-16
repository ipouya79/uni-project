import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function BookingWidget({ listing }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumbeOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function handleBook() {
    const response = await axios.post("http://localhost:4000/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberOfNights * listing.price,
      listing: listing._id,
    });
    const bookingId = response.data._id;
    navigate(`/account/bookings/${bookingId}`);
  }

  return (
    <div className="bg-white border mt-10 rounded-md shadow-lg max-w-md sm:p-2 md:p-4  ">
      <div>
        <span className="font-semibold text-lg">
          هرشب {listing.price} تومان
        </span>
      </div>
      <div className="border rounded-md mt-2">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="text-xs">تاریخ ورود</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label className="text-xs">تاریخ خروج</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="text-xs">میهمانان</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumbeOfGuests(e.target.value)}
            min="1"
            max={listing.maxGuests}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className="text-xs">نام و نام خانوادگی</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-xs">شماره تماس</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={handleBook}
        className="bg-primary w-full mt-4 py-2 rounded-md"
      >
        رزرو
      </button>
      {checkIn && checkOut && (
        <div className="flex justify-between my-2">
          <p className="underline">
            {listing.price} هر شب / {numberOfNights}{" "}
            {numberOfNights > 1 ? "شب " : "شب"}
          </p>
          <p>{numberOfNights * listing.price} تومان</p>
        </div>
      )}
    </div>
  );
}
