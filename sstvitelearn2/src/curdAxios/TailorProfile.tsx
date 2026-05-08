 import React from "react";
import { useState } from "react";
import axios from "axios";

interface TailorType {
  personal: {
    emailid: string;
    name: string;
    contact: string;
    address: string;
    city: string;
    aadharno: string;
    profilePic: File | null;
    aadharCard: File | null;
  };
  professional: {
    category: string;
    speciality: string;
    social: string;
    since: string;
    worktype: string;
    shopadr: string;
    shopcity: string;
    otherinfo: string;
  };
}

export default function ProfileTailor() {

  const [tailor, setTailor] = useState({
    personal: {
      emailid: "",
      name: "",
      contact: "",
      address: "",
      city: "",
      aadharno: "",
      profilePic: null,
      aadharCard: null,
    },
    professional: {
      category: "",
      speciality: "",
      social: "",
      since: "",
      worktype: "",
      shopadr: "",
      shopcity: "",
      otherinfo: "",
    }
  });

  const [prev, setPrev] = useState<string | null>(null);
  const [prevAadhar, setPrevAadhar] = useState<string | null>(null);
  //const [isEditMode, setState] = useState(true);

  
  const handlePersonal = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setTailor((prev) => ({
    ...prev,
    personal: {
      ...prev.personal,
      [name]: value,
    },
  }));
};

const handleProfessional = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  setTailor((prev) => ({
    ...prev,
    professional: {
      ...prev.professional,
      [name]: value,
    },
  }));
};

  // ----------------- File Upload with Preview -----------------
  function updatePicAndSetPreview(
  e: React.ChangeEvent<HTMLInputElement>,
  type: "profilePic" | "aadharCard"
) {

  const file = e.currentTarget.files?.[0];  // 🔥 VERY IMPORTANT CHANGE

  if (!file) return;

  setTailor(prev => ({
    ...prev,
    personal: {
      ...prev.personal,
      [type]: file
    }
  }));

  const previewUrl = URL.createObjectURL(file);

  if (type === "profilePic") setPrev(previewUrl);
  else setPrevAadhar(previewUrl);
}


    
 //////////////////adhar card////////////////////
async function handleExtractAadhar() {

  const file = tailor.personal.aadharCard;

  if (!file) {
    alert("Please select Aadhaar card first");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required");
    return;
  }

  const formData = new FormData();
  formData.append("aadharCard", file);

  try {

    const response = await axios.post(
      "https://stich-aura.vercel.app/tailor/extractaadhaar",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`   // 🔥 THIS WAS MISSING
        }
      }
    );

    console.log("OCR RESPONSE:", response.data);

    if (response.data.status) {

      const extracted = response.data.data;

      setTailor(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          aadharno: extracted.aadharno || extracted.adhaar_number || "",
          name: extracted.name || "",
          address: extracted.address || "",
          city: extracted.city || ""
        }
      }));

      alert("Aadhaar Data Extracted ✅");

    } else {
      alert("OCR Failed");
    }

  } catch (err) {
    console.log(err);
    alert("Server Error / Unauthorized");
  }
}
  // ----------------- SAVE -----------------
 const handleSubmit = async () => {
  //e.preventDefault();

  const token = localStorage.getItem("token");

  let url = "https://stich-aura.vercel.app/tailor/tailorprofilesignup";

  let frmData = new FormData();

  frmData.append("emailid", tailor.personal.emailid);
  frmData.append("name", tailor.personal.name);
  frmData.append("contact", tailor.personal.contact);
  frmData.append("address", tailor.personal.address);
  frmData.append("city", tailor.personal.city);
  frmData.append("aadharno", tailor.personal.aadharno);

  if (tailor.personal.profilePic)
    frmData.append("profilePic", tailor.personal.profilePic);

  if (tailor.personal.aadharCard)
    frmData.append("aadharCard", tailor.personal.aadharCard);

  frmData.append("category", tailor.professional.category);
frmData.append("speciality", tailor.professional.speciality);
frmData.append("social", tailor.professional.social);
frmData.append("since", tailor.professional.since);
frmData.append("worktype", tailor.professional.worktype);
frmData.append("shopadr", tailor.professional.shopadr);
frmData.append("shopcity", tailor.professional.shopcity);
frmData.append("otherinfo", tailor.professional.otherinfo);

  let response = await axios.post(url, frmData, {
    headers: {
      //"Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token   // ✅ JWT MANUAL APPLY
    }
  });

  alert("Saved ✅");
};

  // ----------------- UPDATE -----------------
 const handleUpdate = async () => {

  const token = localStorage.getItem("token");

  const url = "https://stich-aura.vercel.app/tailor/tailorprofileupdate";

  let frmData = new FormData();

  frmData.append("emailid", tailor.personal.emailid);
  frmData.append("name", tailor.personal.name);
  frmData.append("contact", tailor.personal.contact);
  frmData.append("address", tailor.personal.address);
  frmData.append("city", tailor.personal.city);
  frmData.append("aadharno", tailor.personal.aadharno);

  if (tailor.personal.profilePic)
    frmData.append("profilePic", tailor.personal.profilePic);

  if (tailor.personal.aadharCard)
    frmData.append("aadharCard", tailor.personal.aadharCard);
frmData.append("category", tailor.professional.category);
frmData.append("speciality", tailor.professional.speciality);
frmData.append("social", tailor.professional.social);
frmData.append("since", tailor.professional.since);
frmData.append("worktype", tailor.professional.worktype);
frmData.append("shopadr", tailor.professional.shopadr);
frmData.append("shopcity", tailor.professional.shopcity);
frmData.append("otherinfo", tailor.professional.otherinfo);


  let response = await axios.post(url, frmData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token   // ✅
    }
  });

  alert("Updated ✅");
};
  // ----------------- FIND -----------------
async function doFind() {

  const token = localStorage.getItem("token");

  let url = "https://stich-aura.vercel.app/tailor/tailorprofilesearch";

  let response2 = await axios.post(
    url,
    { emailid: tailor.personal.emailid },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token   // ✅ JWT ADDED
      }
    }
  );

  const doc = response2.data.doc;

  if (!doc) {
    alert("No record found");
    return;
  }

  setTailor({
    personal: {
      emailid: doc.emailid || "",
      name: doc.name || "",
      contact: doc.contact || "",
      address: doc.address || "",
      city: doc.city || "",
      aadharno: doc.aadharno || "",
      profilePic: doc.profilePic || null,
      aadharCard: doc.aadharCard || null,
    },
    professional: {
      category: doc.category || "",
      speciality: doc.speciality || "",
      social: doc.social || "",
      since: doc.since || "",
      worktype: doc.worktype || "",
      shopadr: doc.shopadr || "",
      shopcity: doc.shopcity || "",
      otherinfo: doc.otherinfo || "",
    }
  });

  setPrev(doc.profilePic);
  setPrevAadhar(doc.aadharCard);
}
  
return (
  <div className="min-h-screen w-full bg-[#111] text-white flex flex-col">

    {/* HEADER */}
    <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <h1 className="text-2xl font-bold">
        Stich<span className="text-pink-500">Aura</span>
      </h1>

      <button
        onClick={() => window.location.href = "/"}
        className="px-4 py-2 bg-pink-600 text-black rounded-lg hover:bg-pink-700"
      >
        Home
      </button>
    </header>

    {/* BODY */}
    <div className="flex-1 flex justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4">

        {/* ================= LEFT - PERSONAL ================= */}
        <div className="w-full lg:w-1/2 bg-[#1a1a1a] border border-gray-700 rounded-2xl p-5">

          <h2 className="text-lg font-bold text-pink-500 mb-4">
            Personal Details
          </h2>

          {/* PROFILE CLICK UPLOAD */}
          <div className="flex items-center gap-4 mb-4">

            <label className="relative cursor-pointer">

              <img
                src={prev || "https://via.placeholder.com/100"}
                className="w-25 h-30 rounded-full border-2 border-pink-500 object-cover"
              />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updatePicAndSetPreview(e, "profilePic")}
              />

              <span className="absolute bottom-0 right-0 bg-pink-600 text-black text-xs px-2 py-1 rounded-full">
                Edit
              </span>

            </label>

            <div>
              <p className="font-semibold">{tailor.personal.name || "Name"}</p>
              <p className="text-sm text-gray-400">{tailor.personal.emailid}</p>
            </div>

          </div>

          <div className="space-y-3">

            <input name="emailid" placeholder="Email ID"
              value={tailor.personal.emailid}
              onChange={handlePersonal}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input name="name" placeholder="Name"
              value={tailor.personal.name}
              onChange={handlePersonal}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input name="contact" placeholder="Contact"
              value={tailor.personal.contact}
              onChange={handlePersonal}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input name="address" placeholder="Address"
              value={tailor.personal.address}
              onChange={handlePersonal}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <div className="flex gap-2">
              <input name="city" placeholder="City"
                value={tailor.personal.city}
                onChange={handlePersonal}
                className="w-1/2 p-2 bg-[#111] border border-gray-700 rounded-lg"
              />

              <input name="aadharno" placeholder="Aadhar No"
                value={tailor.personal.aadharno}
                onChange={handlePersonal}
                className="w-1/2 p-2 bg-[#111] border border-gray-700 rounded-lg"
              />
            </div>

            {/* AADHAR UPLOAD CLICKABLE */}
            {/* <label className="block cursor-pointer">

              <div className="w-full p-2 border border-gray-700 rounded-lg text-center bg-[#111]">
                📄 Upload Aadhaar Card
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updatePicAndSetPreview(e, "aadharCard")}
              />

            </label> */}
                 {/* AADHAR UPLOAD CLICKABLE */}
<label className="block cursor-pointer">

  <div className="w-full p-2 border border-gray-700 rounded-lg text-center bg-[#111]">
    📄 Upload Aadhaar Card
  </div>

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => updatePicAndSetPreview(e, "aadharCard")}
  />

</label>

{/* ✅ AADHAR PREVIEW */}
{prevAadhar && (
  <div className="mt-3 flex justify-center">
    <img
      src={prevAadhar}
      alt="Aadhar Preview"
      className="w-52 h-32 object-cover rounded-lg border border-pink-500"
    />
  </div>
)}
            <button
              type="button"
              onClick={handleExtractAadhar}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-black"
            >
              Auto Fill Aadhaar
            </button>

          </div>
        </div>

        {/* ================= RIGHT - PROFESSIONAL ================= */}
        <div className="w-full lg:w-1/2 bg-[#1a1a1a] border border-gray-700 rounded-2xl p-5">

          <h2 className="text-lg font-bold text-green-400 mb-4">
            Professional Details
          </h2>

          <div className="space-y-3">

            <select name="category"
              value={tailor.professional.category}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            >
              <option value="">Category</option>
              <option>Men</option>
              <option>Women</option>
              <option>Children</option>
            </select>

            <input name="speciality"
              placeholder="Speciality"
              value={tailor.professional.speciality}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input name="social"
              placeholder="Website / Instagram"
              value={tailor.professional.social}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input type="date"
              name="since"
              value={tailor.professional.since}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <select name="worktype"
              value={tailor.professional.worktype}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            >
              <option value="">Work Type</option>
              <option>Home</option>
              <option>Shop</option>
              <option>Both</option>
            </select>

            <input name="shopcity"
              placeholder="Shop City"
              value={tailor.professional.shopcity}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <input name="shopadr"
              placeholder="Shop Address"
              value={tailor.professional.shopadr}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg"
            />

            <textarea name="otherinfo"
              placeholder="Other Info"
              value={tailor.professional.otherinfo}
              onChange={handleProfessional}
              className="w-full p-2 bg-[#111] border border-gray-700 rounded-lg h-20"
            />

          </div>
        </div>
      </div>
    </div>

    {/* ================= BUTTONS (REDUCED WIDTH) ================= */}
    <div className="flex justify-center gap-3 p-4">

      {/* <button 
      type="button"
        className="w-28 bg-pink-600 py-2 rounded-lg text-black text-sm"
      >
        Save
      </button> */}

      <button
  type="button"
  onClick={handleSubmit}
  className="w-28 bg-pink-600 py-2 rounded-lg text-black text-sm"
>
  Save
</button>

      <button type="button"
        onClick={handleUpdate}
        className="w-28 bg-green-600 py-2 rounded-lg text-black text-sm"
      >
        Update
      </button>

      <button type="button"
        onClick={doFind}
        className="w-28 bg-blue-600 py-2 rounded-lg text-black text-sm"
      >
        Search
      </button>

    </div>

    {/* FOOTER */}
    <footer className="text-center py-4 border-t border-gray-800 text-gray-400 text-xs">
      © 2026 StitchAura | Tailor Dashboard
    </footer>

  </div>
)
}