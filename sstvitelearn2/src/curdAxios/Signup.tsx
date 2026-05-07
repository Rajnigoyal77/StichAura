import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignupForm {
  emailid: string;
  password: string;
  usertype: string;
  
}

   export default function Signup() {

     const navigate = useNavigate();
  const [form, setForm] = useState<SignupForm>({
    emailid: "",
    password: "",
    usertype: "",
  });

  const [errors, setErrors] = useState<Partial<SignupForm>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<SignupForm> = {};

    if (!form.emailid) {
      newErrors.emailid = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailid)) {
      newErrors.emailid = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.usertype) {
      newErrors.usertype = "Please select user type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

      const [showPassword, setShowPassword] = useState(false);


 
      ///////////signup button 1 step for click
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault();

  if (!validate()) return;

  console.log(form);

  let url = "https://stich-aura.vercel.app/user/signupaxios";

  try {

    // let response = await axios.post(url, form);

    // alert(JSON.stringify(response.data));

    let response = await axios.post(url, form);

console.log("RESPONSE:", response.data);

// ✅ SAVE TOKEN
if (response.data.token) {
  localStorage.setItem("token", response.data.token);
}

alert("Signup Success & Token Saved ✅");

  }
  catch(err){
    console.log(err);



    
  }




};
return (
  <div className="min-h-screen w-full bg-[#111] text-white flex flex-col overflow-x-hidden">

    {/* HEADER */}
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">

      {/* LOGO */}
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

    {/* CENTER AREA */}
    <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-amber-400/20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>

      <div className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-amber-400/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* SIGNUP CARD */}
      <div
        className="relative w-full max-w-md sm:max-w-lg mx-auto bg-[#1a1a1a]/90 backdrop-blur-lg
        border border-gray-700 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 z-10"
      >

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Join StitchAura Fashion Studio
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* EMAIL */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="emailid"
              value={form.emailid}
              onChange={handleChange}
              className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
              text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
            />

            {errors.emailid && (
              <p className="text-red-400 text-sm mt-1">
                {errors.emailid}
              </p>
            )}

          </div>

          {/* PASSWORD
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
              text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password}
              </p>
            )}

          </div> */}

{/* PASSWORD */}
<div>

  <label className="block text-sm text-gray-300 mb-2">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={form.password}
      onChange={handleChange}
      className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
      text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
    >
      {showPassword ? "🙈" : "👁"}
    </button>

  </div>

  {errors.password && (
    <p className="text-red-400 text-sm mt-1">
      {errors.password}
    </p>
  )}

</div>



          {/* USER TYPE */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              User Type
            </label>

            <select
              name="usertype"
              value={form.usertype}
              onChange={handleChange}
              className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#111] border border-gray-700
              text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400 outline-none"
            >

              <option value="">Select</option>
              <option value="Tailor">Tailor</option>
              <option value="Custumer">Custumer</option>

            </select>

            {errors.usertype && (
              <p className="text-red-400 text-sm mt-1">
                {errors.usertype}
              </p>
            )}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 transition
            py-3 rounded-xl font-semibold text-base sm:text-lg text-black"
          >
            Signup
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