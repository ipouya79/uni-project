import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../../components/booking/BookingWidget";
import ListingGallery from "../../components/listing/ListingGallery";
import AddressLink from "../../components/listing/AddressLink";

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:4000/listings/${id}`).then((response) => {
      setListing(response.data);
      console.log(response.data);
    });
  }, [id]);

  return (
    <>
      {listing && (
        <div className="inner inner-mobile">
          <div className="bg-white title">
            <div className="pb-6 rounded-md">
              <h1 className="text-3xl font-semibold rtl-direction text-right">
                {listing.title}
              </h1>
              <AddressLink>
                {listing.address}, {listing.city}
              </AddressLink>
            </div>
            <ListingGallery listing={listing} />
            <div className="mt-4  gap-4 rtl-direction text-right  flex justify-between flex-row-reverse f-d-col">
              <div className="">
                <div className="rounded-md py-4 border-b ">
                  <h2 className="font-semibold text-xl py-2">
                    درباره این مکان
                  </h2>
                  {listing.description}
                </div>
                <div className="rounded-md py-4 border-b">
                  <h2 className="font-semibold text-xl py-2">شرایط</h2>
                  <div className="grid grid-cols-3">
                    <div>
                      ساعت ورود: <br /> {listing.checkIn}
                    </div>
                    <div>
                      ساعت خروج:
                      <br /> {listing.checkOut}
                    </div>
                    <div>
                      حداکثر تعداد میهمان:
                      <br /> {listing.maxGuests}
                    </div>
                  </div>
                </div>
                <div className="rounded-md py-4 border-b">
                  <h2 className="font-semibold text-xl py-2">
                  امکانات اقامتگاه


                  </h2>
                  <div className="flex gap-2">
                    {listing.perks.map((perk) => (
                      <div
                        key={perk}
                        className="border p-2 bg-primary text-white"
                      >
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <BookingWidget listing={listing}></BookingWidget>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
