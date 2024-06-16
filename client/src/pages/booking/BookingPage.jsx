import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../../components/listing/AddressLink";
import ListingGallery from "../../components/listing/ListingGallery";
import BookingDates from "../../components/booking/BookingDates";

export default function BookingPage(){
    const { id } = useParams();
    const [ booking, setBooking] = useState(null);

    useEffect(() => {
        if (id){
            axios.get("http://localhost:4000/bookings").then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id )
                if (foundBooking){
                    setBooking(foundBooking)
                }
            })
        }
    }, [id] )
    
    if (!booking){
        return "";
    }

    return (
        <div className="p-4 max-w-screen-lg">
        <h1 className="text-3xl text-right rtl-direction">{booking.listing.title}</h1>
        <AddressLink className="my-2 block">{booking.listing.address}, {booking.listing.city}</AddressLink>
        <div className="border p-6 py-6 mb-4 rounded-md flex flex-col items-center justify-between sm:flex-row-reverse sm:items-start sm:text-right">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl mb-4 rtl-direction text-right">اطلاعات رزرو شما</h2>
            <BookingDates booking={booking}></BookingDates>
          </div>
          <div className="bg-primary p-4 text-white rounded-2xl text-right rtl-direction">
            <div>مجموع پرداختی:</div>
            <div className="text-2xl">تومان {booking.price}</div>
          </div>
        </div>
        <ListingGallery listing={booking.listing}/>
      </div>
      
    )
}