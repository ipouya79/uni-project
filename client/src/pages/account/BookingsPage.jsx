import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import BookingDates from "../../components/booking/BookingDates";
import ListingImg from "../../components/listing/ListingImg";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <div className="p-4">
        {bookings &&
          bookings.map((booking, index) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={index}
              className="flex gap-4 overflow-hidden border mb-2"
            >
              <div className="w-48">
                <ListingImg listing={booking.listing} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-lg font-semibold text-right">
                  {booking.listing.title}
                </h2>
                <BookingDates
                  booking={booking}
                  className="my-2 text-sm"
                ></BookingDates>
                <div className="text-sm rtl-direction text-right">
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  شب | مجموع پرداختی: {booking.price} تومان
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
