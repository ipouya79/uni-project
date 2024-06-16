import Perks from "../../components/listing/Perks";
import ImageUploader from "../../components/listing/ImageUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [byWho, setByWho] = useState("");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState(1);
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(500000);

  useEffect(() => {
    if (!id) {
      return;
    }
    console.log(id);
    axios.get("http://localhost:4000/listings/" + id).then((response) => {
      console.log(response);
      const { data } = response;
      setTitle(data.title);
      setCity(data.city);
      setByWho(data.byWho);
      setType(data.type);
      setRooms(data.rooms);
      setAddress(data.address);
      setImages(data.images);
      setDescription(data.description);
      setPerks(data.perks);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function handleSaveListing(e) {
    e.preventDefault();
    const listingData = {
      title,
      byWho,
      city,
      address,
      type,
      rooms,
      images,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        await axios.put("http://localhost:4000/listings", {
          id,
          ...listingData,
        });
      } else {
        await axios.post("http://localhost:4000/listings", listingData);
      }

      navigate("/account/listings");
    } catch (error) {
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      } else {
        alert(error);
      }
    }
  }

  return (
    <div className="m-4 p-4 border rounded-md ">
      <h1 className="text-2xl font-semibold pb-4 border-b text-right">
        {id ? "ویرایش پست" : "مشخصات پست"}
      </h1>
      <form onSubmit={handleSaveListing} className="text-right">
        <label className="font-semibold inline-block mt-4 mb-2">عنوان</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان مکان مورد نظر را وارد نمایید"
        />
        <label className="font-semibold inline-block my-2">توسط</label>
        <input
          type="text"
          value={byWho}
          onChange={(e) => setByWho(e.target.value)}
          placeholder="نام و نام خانوادگی"
        />
        <label className="font-semibold inline-block my-2">شهر</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder=" تهران  "
        />
        <label className="font-semibold inline-block my-2">آدرس</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="تهران ، گاندی شمالی ، ساختمان اطلس"
        />
        <label className="font-semibold inline-block my-2">نوع مسکن</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">نوع مسکن را انتخاب کنید</option>
          <option value="ویلا">ویلا</option>
          <option value="اپارتمان">اپارتمان</option>
          <option value="مهمان خانه">مهمان خانه</option>
          <option value="سوئیت">سوئیت</option>
        </select>
        <label className="font-semibold inline-block my-2">تصاویر</label>
        <ImageUploader images={images} onChange={setImages} />
        <label className="font-semibold inline-block my-2">
          درباره این مکان
        </label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحی مختصر از اقامتگاه "
        />
        <label className="font-semibold inline-block my-2">
          مزایا و امکانات رفاهی
        </label>
        <Perks selected={perks} onChange={setPerks}></Perks>
        <div className="grid gap-2 grid-cols-4 md-grid-cols-6 my-4 rtl-direction">
          <div>
            <label className="font-semibold mb-2 inline-block">
              ساعت ورود
            </label>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <label className="font-semibold mb-2 inline-block">
              ساعت خروج
            </label>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <label className="font-semibold mb-2 inline-block">
              حداکثر مهمان
            </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold mb-2 inline-block">
              قیمت یک شبانه روز
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold mb-2 inline-block">
              تعداد اتاق ها
            </label>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">
          {id ? " بروزرسانی " : "اضافه کردن"}
        </button>
      </form>
    </div>
  );
}
