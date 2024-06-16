import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "ثبت نام با موفقیت انجام شد",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      alert("Registration failed. Please try again later.");
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "  ثبت نام انجان نشد ، لطفا بعدا تلاش کنید   ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">ثبت نام</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
          id="registerName"
            type="text"
            placeholder=" Your Name"
            className="mb-2 loginNameClass"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
          id="registerEmail"
            type="email"
            placeholder="Your@email.com"
            className="mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
          id="registerPassword"
            type="password"
            placeholder="Password"
            className="mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary">ثبت نام</button>
        </form>
        <div className="py-2 text-center text-gray-500">
          آیا حساب کاربری دارید؟{" "}
          <Link className="underline text-bl" to={"/login"}>
            وارد شوید
          </Link>
        </div>
      </div>
    </div>
  );
}
