import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: 'ورود موفقیت آمیز',
        showConfirmButton: false,
        timer: 1500,
      });
      setUser(data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "question",
          title: "خطا",
          text: "ایمیل یا رمزکاربری به درستی وارد نشده اند ",
          footer: '<a href="/login">دوباره تلاش کنید</a>',
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "لطفا مجددا تلاش نمایید ",
          footer: '<a href="/login">دوباره تلاش کنید</a>',
        });
      }
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4"> ورود </h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
          id="loginEmail"
            type="email"
            className="mb-2"
            placeholder="Your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          id="loginPassword"
            type="password"
            className="mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">ورود به حساب کاربری</button>
        </form>
        <div className="py-2 text-center text-gray-500">
          حساب کاربری ندارید؟{" "}
          <Link className="underline text-bl" to={"/register"}>
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}
