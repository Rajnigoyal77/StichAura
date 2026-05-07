import React, { useState } from "react";
     import axios from "axios";


     interface SignupFormState {
  emailid: string;
  profilepic:null|File;
  // pic:null|File
  name:string;
  address:string;
  city:string;
  state:string;
  gender:string;
  dos:String;
  // isEditMode:boolean;
}
let stateAry=["Punjab","Delhi","UttarPradesh","Uttarakhand","TamilNadu","Kerala","AndhraPradesh","Haryana"];

const Signup= () => {
  const [formData, setFormData] = useState<SignupFormState>({
    emailid: "",
    profilepic: null ,
    name: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    dos:"",
    // isEditMode:true
  });
  const[prev,setPrev]=useState<string|null>(null);
   const[isEditMode,setState]=useState(true);
   

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value} = e.target ;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const uniqueStates=stateAry.map((obj)=>obj);
  // alert(uniqueStates);

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    console.log(formData);
    let url="https://stich-aura-backend.vercel.app/customer/customerprofilesignup";
    let frmData=new FormData();
    frmData.append("emailid",formData.emailid);
    frmData.append("name",formData.name);
    frmData.append("address",formData.address);
    frmData.append("city",formData.city);
     frmData.append("state",formData.state);
     frmData.append("gender",formData.gender);
    if(formData.profilepic)
      frmData.append("profilepic",formData.profilepic);
   
    
    let response=await axios.post(url, frmData, {headers: {'Content-Type': 'multipart/form-data'} });
    alert(JSON.stringify(response))
     alert("Signup Success & Mail Sent ✅");
    setState(false);
  };


  

// function updatePicAndSetPreview(event:React.ChangeEvent<HTMLInputElement>)
//   {
//     let selFileObj=event.target.files[0];
//      setFormData((prev)=>(
//         {...prev,["profilepic"]:selFileObj} ))
//         const prevObj=URL.createObjectURL(selFileObj);
//         setPrev(prevObj);
    


//   }



function updatePicAndSetPreview(event: React.ChangeEvent<HTMLInputElement>) {

  let selFileObj = event.target.files?.[0];

  if (!selFileObj) return;

  setFormData((prev) => (
    { ...prev, ["profilepic"]: selFileObj }
  ));

  const prevObj = URL.createObjectURL(selFileObj);
  setPrev(prevObj);
}

  const handleUpdate =  async () => {
   
    console.log(formData);
    let url="https://stich-aura-backend.vercel.app/customer/customerprofileupdate";
    let frmData=new FormData();
    frmData.append("emailid",formData.emailid);
    frmData.append("name",formData.name);
    frmData.append("address",formData.address);
    frmData.append("city",formData.city);
     frmData.append("state",formData.state);
     frmData.append("gender",formData.gender);
    if(formData.profilepic)
      frmData.append("profilepic",formData.profilepic);
   
    
    let response1=await axios.post(url, frmData, {headers: {'Content-Type': 'multipart/form-data'} });
    alert(JSON.stringify(response1))
  };


  
  async function doFind()
  {
   let url = "https://stich-aura.vercel.app/customer/customerprofilesearch";
     let response2= await axios.post(url,{emailid:formData.emailid},{headers: { "Content-Type": "application/x-www-form-urlencoded" }});
   
 
     setFormData(response2.data.doc);
     setPrev(response2.data.doc.picurl)
   
     alert(JSON.stringify(response2));
     
      setState(false)
          
  }

return (
  <div className="min-h-screen w-screen bg-[#111] text-white flex flex-col overflow-x-hidden">

    {/* HEADER */}
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl sm:text-2xl font-bold">
        Stich<span className="text-amber-400">Aura 🧵</span>
      </h1>
    </header>

    {/* MAIN */}
    <main className="flex-1 w-full flex items-center justify-center relative px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[350px] h-[350px] bg-pink-600/20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-[250px] h-[250px] bg-pink-500/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* CARD */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg z-10">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-8">

          <h2 className="text-3xl font-bold text-center mb-6">
            Customer Profile
          </h2>

          {/* EMAIL + FIND */}
          <div className="flex gap-3 mb-4">
            <input
              type="email"
              name="emailid"
              placeholder="Email ID"
              value={formData.emailid}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <button
              type="button"
              onClick={doFind}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-black font-semibold"
            >
              Find
            </button>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex gap-4 items-center mb-4">
            <input
              type="file"
              name="profilepic"
              onChange={updatePicAndSetPreview}
              className="w-full text-sm bg-[#111] border border-gray-700 rounded-xl p-2"
            />

            {prev && (
              <img
                src={prev}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-600"
              />
            )}
          </div>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          />

          {/* ADDRESS */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          />

          {/* CITY + STATE */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="" disabled>Select State</option>
              {uniqueStates.map((str, i) => (
                <option key={i} value={str}>{str}</option>
              ))}
            </select>
          </div>

          {/* GENDER */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 rounded-xl bg-[#111] border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* BUTTONS */}
          <div className="flex gap-4">
            {isEditMode && (
              <button
                type="submit"
                className="w-1/2 bg-pink-600 hover:bg-pink-700 py-2 rounded-xl text-black font-semibold"
              >
                Save
              </button>
            )}

            {!isEditMode && (
              <button
                type="button"
                onClick={handleUpdate}
                className="w-1/2 bg-green-600 hover:bg-green-700 py-2 rounded-xl text-black font-semibold"
              >
                Update
              </button>
            )}
          </div>

        </div>
      </form>

    </main>

    {/* FOOTER */}
    <footer className="w-full text-center py-4 border-t border-gray-800 text-gray-400 text-xs sm:text-sm">
      © 2026 StitchAura. All rights reserved.
    </footer>

  </div>
)
};

export default Signup;