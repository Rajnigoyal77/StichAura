import React, { useState } from "react";
import axios from "axios";

interface SignupFormState {
  emailid: string;
  profilepic: null | File;
  name: string;
  address: string;
  city: string;
  state: string;
  gender: string;
  dos: string;
}

let stateAry = [
  "Punjab",
  "Delhi",
  "UttarPradesh",
  "Uttarakhand",
  "TamilNadu",
  "Kerala",
  "AndhraPradesh",
  "Haryana"
];

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormState>({
    emailid: "",
    profilepic: null,
    name: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    dos: ""
  });

  const [prev, setPrev] = useState<string | null>(null);
  const [isEditMode, setEditMode] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const uniqueStates = stateAry.map((obj) => obj);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url =
      "https://stich-aura.vercel.app/customer/customerprofilesignup";

    let frmData = new FormData();

    frmData.append("emailid", formData.emailid);
    frmData.append("name", formData.name);
    frmData.append("address", formData.address);
    frmData.append("city", formData.city);
    frmData.append("state", formData.state);
    frmData.append("gender", formData.gender);

    if (formData.profilepic) {
      frmData.append("profilepic", formData.profilepic);
    }

    let response = await axios.post(url, frmData);

    alert(JSON.stringify(response.data));
    alert("Signup Success & Mail Sent ✅");

    setEditMode(false);
  };

  function updatePicAndSetPreview(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let selFileObj = event.target.files?.[0];
    if (!selFileObj) return;

    setFormData((prev) => ({
      ...prev,
      profilepic: selFileObj
    }));

    const prevObj = URL.createObjectURL(selFileObj);
    setPrev(prevObj);
  }

  const handleUpdate = async () => {
    let url =
      "https://stich-aura.vercel.app/customer/customerprofileupdate";

    let frmData = new FormData();

    frmData.append("emailid", formData.emailid);
    frmData.append("name", formData.name);
    frmData.append("address", formData.address);
    frmData.append("city", formData.city);
    frmData.append("state", formData.state);
    frmData.append("gender", formData.gender);

    if (formData.profilepic) {
      frmData.append("profilepic", formData.profilepic);
    }

    let response1 = await axios.post(url, frmData);

    alert(JSON.stringify(response1.data));
  };

  async function doFind() {
    let url =
      "https://stich-aura.vercel.app/customer/customerprofilesearch";

    let response2 = await axios.post(
      url,
      { emailid: formData.emailid },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    setFormData(response2.data.doc as SignupFormState);
    setPrev(response2.data.doc.picurl);

    alert(JSON.stringify(response2.data));

    setEditMode(false);
  }

 return (
  <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
    
    {/* HEADER */}
    <header className="w-full border-b border-gray-800 bg-[#111]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">
          Stich<span className="text-amber-400">Aura 🧵</span>
        </h1>
      </div>
    </header>

    {/* MAIN */}
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-[#1a1a1a] border border-gray-700 rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Customer Profile
        </h2>

        {/* EMAIL + FIND */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <label className="block mb-2 text-sm text-gray-300">
              Email ID
            </label>

            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={doFind}
              className="w-full bg-green-600 hover:bg-green-700 transition-all py-3 rounded-xl font-semibold"
            >
              Find
            </button>
          </div>
        </div>

        {/* PROFILE PIC */}
        <div className="mb-8">
          <label className="block mb-2 text-sm text-gray-300">
            Profile Picture
          </label>

          <input
            type="file"
            onChange={updatePicAndSetPreview}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"
          />

          {prev && (
            <img
              src={prev}
              alt="preview"
              className="w-28 h-28 object-cover rounded-full mt-5 border-4 border-pink-500"
            />
          )}
        </div>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-gray-300">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select State</option>

              {uniqueStates.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* GENDER */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-10">
          {isEditMode ? (
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 transition-all py-3 rounded-xl text-lg font-bold"
            >
              Save Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full bg-green-600 hover:bg-green-700 transition-all py-3 rounded-xl text-lg font-bold"
            >
              Update Profile
            </button>
          )}
        </div>
      </form>
    </main>

    {/* FOOTER */}
    <footer className="border-t border-gray-800 py-4 text-center text-gray-400">
      © 2026 StitchAura
    </footer>
  </div>
)
}


export default Signup;