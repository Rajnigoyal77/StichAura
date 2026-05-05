import React, { useState } from "react";
import axios from "axios";

function Reviews() {

  const [formData, setFormData] = useState({
    contact: "",
    name: "",
    rating: 0,
    review: "",
  });

  // Fetch Tailor Name based on Contact No
  async function fetchTailor() 
  {
  if (formData.contact === "") return;

  let url = "http://localhost:2007/review/tailornamesearch";

  try {
    let response = await axios.post(url, { contact: formData.contact });

    if (response.data.status) {
      setFormData({
        ...formData,
        name: response.data.name
      });
    } else {
      setFormData({
        ...formData,
        name: ""
      });
      alert("Tailor Not Found");
    }
  } catch (err) {
    console.error("Error fetching tailor:", err);
    alert("Server error while fetching tailor");
  }
}

  // Publish Review
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token) {
    alert("Login required");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:2007/review/tailorreview",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    console.log("SUCCESS:", response.data);
    alert("Review Submitted");

  } catch (err:any) {
    console.log("ERROR RESPONSE:", err.response?.data);
    alert(err.response?.data?.msg || "Unauthorized");
  }


};

return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#12000c] to-black text-white">

    {/* HEADER */}
    <div className="bg-black border-b border-pink-500/20 px-6 py-3 text-lg font-semibold">
      Stich<span className="text-amber-400">Aura</span> 🧵
    </div>

    {/* MAIN */}
    <div className="flex-1 flex justify-center items-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5"
      >

        <div className="bg-[#111] border border-pink-500/20 p-6 rounded-xl shadow-lg w-full max-w-md">
<div className="text-center mb-6">
  <h2 className="text-2xl font-bold text-pink-500">
    What Our Clients Say 👩🏻‍🦰
  </h2>

  <p className="text-gray-400 mt-2">
    Trusted by fashion lovers for premium tailoring experiences.
  </p>
</div>
      
          {/* Mobile + Name */}
          <div className="flex gap-4 mb-6">

            <div className="w-1/2">
              <label className="block text-sm mb-1 text-gray-300">
                Tailor Mobile Number
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: e.target.value
                  })
                }
                onBlur={fetchTailor}
                placeholder="Enter mobile"
                className="w-full bg-black border border-pink-500/40 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1 text-gray-300">
                Tailor Name
              </label>
              <input
                type="text"
                value={formData.name}
                readOnly
                className="w-full bg-[#1a1a1a] border border-pink-500/20 p-2 rounded-lg text-gray-400"
              />
            </div>

          </div>

          {/* Stars */}
          <div className="flex justify-center text-3xl mb-6">

            {[1,2,3,4,5].map((num)=>(
              <span
                key={num}
                onClick={()=>setFormData({...formData,rating:num})}
                className={
                  formData.rating>=num
                    ? "text-pink-500 cursor-pointer"
                    : "text-gray-600 cursor-pointer"
                }
              >
                ★
              </span>
            ))}

          </div>

          {/* Review */}
          <textarea
            rows={8}
            value={formData.review}
            onChange={(e) =>
              setFormData({
                ...formData,
                review: e.target.value
              })
            }
            placeholder="Write your review"
            className="w-full bg-black border border-pink-500/40 p-3 rounded-lg mb-6 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Publish */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-black py-2 rounded-lg font-semibold transition"
          >
            Publish Review
          </button>

        </div>
      </form>
    </div>

    {/* FOOTER */}
    <footer className="bg-black border-t border-pink-500/20 text-center py-5">
      <p className="text-gray-400 text-sm">
        © 2026 StichAura. All rights reserved.
      </p>
    </footer>

  </div>
)
};
export default Reviews;