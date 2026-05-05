import { useEffect, useState } from "react";
import axios from "axios";

function FindTailor() {

  const [selectedCity, setSelectedCity] = useState("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [category, setSelectedCategory] = useState("");
  const [specialityList, setSpecialityList] = useState<string[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [tailorList, setTailorList] = useState<any[]>([]);

  async function doGetCities() {

    let url = "http://localhost:2007/tailor/getcities";
    let response = await axios.post(url);

    if (response.data.cities) {
      setCityList([...new Set (response.data.cities)]);
    }
  }

  useEffect(() => {
    doGetCities();
  }, []);

  async function doGetSpeciality(category: string) {

    setSelectedSpeciality("");

    let url = "http://localhost:2007/tailor/getspeciality";

    let response = await axios.post(
      url,
      { category: category },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response.data.speciality) {
      setSpecialityList(response.data.speciality);
    }
  }

  async function findRecord() {

    let url = "http://localhost:2007/tailor/tailorfullrecord";

    let response3 = await axios.post(
      url,
      {
        shopcity: selectedCity,
        category: category,
        speciality: selectedSpeciality
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response3.data.doc) {
      setTailorList(response3.data.doc);
    }
    else {
      alert("No tailors found❌");
    }
  }

  
  

return (

<div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#12000c] to-black text-white">

  {/* HEADER */}
  <div className="bg-black border-b border-pink-500/20 px-6 py-4 flex justify-between items-center">

    <h1 className="text-3xl font-extrabold">
      Stich<span className="text-amber-400">Aura</span> 🧵
    </h1>

    <p className="text-gray-400 text-sm">
      Find Your Perfect Tailor🔎
    </p>

  </div>


  {/* MAIN CONTENT */}
  <div className="flex-1 p-6">

    {/* TITLE */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-extrabold">
        Discover Expert Tailors ✂ 
      </h1>

      <p className="text-gray-400 mt-3">
        Browse and connect with verified tailors near you. Filter by category, speciality, and city to find the perfect match.
      </p>
    </div>


    {/* FILTER CARD */}
    <div className="max-w-5xl mx-auto bg-[#111] border border-pink-500/20 rounded-2xl p-6 shadow-lg mb-12">

      <div className="grid md:grid-cols-4 gap-5">

        {/* CITY */}
        <div>
          <label className="text-gray-300 text-sm">City</label>
          <select
            value={selectedCity}
            onChange={(e)=>setSelectedCity(e.target.value)}
            className="w-full mt-1 bg-black border border-pink-500/40 p-2 rounded-lg text-white"
          >
            <option value="">Select City</option>
            {
              cityList.map((city,index)=>(
                <option key={index} value={city}>{city}</option>
              ))
            }
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-gray-300 text-sm">Category</label>
          <div className="flex gap-3 mt-2 text-sm">

            {["Men","Women","Children"].map((cat)=>(
              <label key={cat}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  onChange={(e)=>{
                    setSelectedCategory(e.target.value)
                    doGetSpeciality(e.target.value)
                  }}
                /> {cat}
              </label>
            ))}

          </div>
        </div>

        {/* SPECIALITY */}
        <div>
          <label className="text-gray-300 text-sm">Speciality</label>
          <select
            value={selectedSpeciality}
            onChange={(e)=>setSelectedSpeciality(e.target.value)}
            className="w-full mt-1 bg-black border border-pink-500/40 p-2 rounded-lg text-white"
          >
            <option value="">Select</option>
            {
              specialityList.map((sp,index)=>(
                <option key={index} value={sp}>{sp}</option>
              ))
            }
          </select>
        </div>

        {/* BUTTON */}
        <div className="flex items-end">
          <button
            onClick={findRecord}
            className="w-full bg-pink-500 hover:bg-pink-600 py-2 rounded-lg text-black"
          >
            Find
          </button>
        </div>

      </div>

    </div>


    {/* RESULTS */}
    <div className="max-w-7xl mx-auto">

      <h2 className="text-3xl font-semibold mb-8 text-center text-pink-400">
        Results ✅
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {
          tailorList.map((obj,index)=>(

            <div
              key={index}
              className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-pink-500/10 transition"
            >

              {/* HEADER */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 flex items-center gap-4">

                <img
                  src={obj.profilePic}
                  className="w-14 h-14 rounded-full border-2 border-white"
                />

                <div>
                  <p className="font-bold text-lg">{obj.name}</p>
                  <p className="text-sm text-gray-200">{obj.city}</p>
                </div>

              </div>

              {/* BODY */}
              <div className="p-5 text-sm text-gray-300 space-y-1">

                <p><b>Email:</b> {obj.emailid}</p>
                <p><b>Contact:</b> {obj.contact}</p>
                <p><b>Category:</b> {obj.category}</p>
                <p><b>Speciality:</b> {obj.speciality}</p>
                <p><b>Since:</b> {obj.since}</p>

              </div>

              {/* FOOT INFO */}
              <div className="p-4 border-t border-pink-500/10 text-xs text-gray-400">

                <p><b>Shop:</b> {obj.shopadr}, {obj.shopcity}</p>
                <p><b>Other:</b> {obj.otherinfo}</p>

              </div>

            </div>

          ))
        }

      </div>

    </div>

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

export default FindTailor;