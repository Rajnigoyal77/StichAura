import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginData {
  emailid: string;
  password: string;
}

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    emailid: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.emailid.trim() === "") {
  alert("Email is required");
  return;
}

if (formData.password.trim() === "") {
  alert("Password is required");
  return;
}

    let url = "http://https://stich-aura-backend.vercel.app//user/loginaxios";

    try {
      let response = await axios.post(url, formData);

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data.status === true) {
        alert("Login Successful ✅");

        // ✅ save token
        localStorage.setItem("token", response.data.token);

     let user = response.data.user;

// ✅ use usertype instead of role
let role = user?.usertype?.toLowerCase()?.trim();

console.log("FINAL ROLE:", role);

        console.log("FINAL ROLE:", role);

        // ✅ navigation
        if (role === "customer" || role === "custumer") {
          navigate("/app/customer");
        } 
        else if (role === "tailor") {
          navigate("/app/tailor");
        } 
        else {
          alert("Unknown role: " + role);
        
        }

      } else {
        alert(response.data.msg);
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Server Error / CORS Issue");
    }
  };
return (
  <div className="min-h-screen w-screen bg-[#111] text-white flex flex-col overflow-x-hidden">

    {/* HEADER */}
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">

      {/* LEFT */}
      <h1 className="text-xl sm:text-2xl font-bold">
        Stich<span className="text-amber-400">Aura 🧵</span>
      </h1>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold transition"
      >
        ← Back
      </button>

    </header>

    {/* MAIN */}
    <main className="flex-1 w-full flex items-center justify-center relative">

      {/* BACKGROUND */}
      <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-amber-500/20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>

      <div className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-amber-400/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* LOGIN CARD */}
      <div
        className="relative w-full max-w-md sm:max-w-lg mx-auto bg-[#1a1a1a]/90 backdrop-blur-lg
        border border-gray-700 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 z-10"
      >

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          ✂
        </h2>

        <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Welcome back to StitchAura
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* EMAIL */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
              text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
              text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 transition
            py-3 rounded-xl font-semibold text-black"
          >
            Login
          </button>

        </form>
      </div>

    </main>

    {/* FOOTER */}
    <footer className="w-full text-center py-4 border-t border-gray-800 text-gray-400 text-xs sm:text-sm">
      © 2026 StitchAura. All rights reserved.
    </footer>

  </div>
)
};