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
    <div className="min-h-screen w-screen bg-[#111] text-white flex flex-col overflow-x-hidden">

      <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl sm:text-2xl font-bold">
          Stich<span className="text-amber-400">Aura 🧵</span>
        </h1>
      </header>

      <main className="flex-1 w-full flex items-center justify-center relative px-4">

        <form onSubmit={handleSubmit} className="w-full max-w-lg z-10">
          <div className="bg-[#1a1a1a]/90 border border-gray-700 rounded-3xl p-6 sm:p-8">

            <h2 className="text-3xl font-bold text-center mb-6">
              Customer Profile
            </h2>

            {/* EMAIL + FIND */}
            <div className="flex gap-3 mb-4">
              <input
                type="email"
                name="emailid"
                value={formData.emailid}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-[#111] border border-gray-700"
              />

              <button
                type="button"
                onClick={doFind}
                className="px-4 py-2 bg-green-600 rounded-xl text-black"
              >
                Find
              </button>
            </div>

            {/* IMAGE */}
            <input type="file" onChange={updatePicAndSetPreview} />

            {prev && (
              <img src={prev} className="w-20 h-20 rounded-full mt-2" />
            )}

            {/* FIELDS */}
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="address" value={formData.address} onChange={handleChange} />
            <input name="city" value={formData.city} onChange={handleChange} />

            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {uniqueStates.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {/* BUTTONS */}
            {isEditMode && (
              <button type="submit" className="bg-pink-600 w-full mt-4">
                Save
              </button>
            )}

            {!isEditMode && (
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-600 w-full mt-4"
              >
                Update
              </button>
            )}
          </div>
        </form>

      </main>

      <footer className="text-center text-gray-400 py-4">
        © 2026 StitchAura
      </footer>
    </div>
  );
};

export default Signup;