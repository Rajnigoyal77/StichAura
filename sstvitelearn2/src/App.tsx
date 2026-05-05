

    /////////////////////old pattern
    // <>
    //   {/* <Signup /> */}
    //   {/* <Login /> */}
    //   {/* <CustomerProfile /> */}
    //   {/* <TailorProfile/> */}
    //   {/* <Reviews/> */}
    //   <FindTailor/>
    // </>


// export default App;


import { Route, Routes } from "react-router-dom";

import HomePage from "./curdAxios/HomePage";
import Login from "./curdAxios/Login";
import Signup from "./curdAxios/Signup";
import CustomerDashboard from "./curdAxios/CustomerDashboard";
import TailorDash from "./curdAxios/TailorDash";

import NavBar from "./routing2/NavBar";
import CustomerProfile from "./curdAxios/CustomerProfile";
import TailorProfile from "./curdAxios/TailorProfile";
import FindTailor from "./curdAxios/FindTailor";
import Reviews from "./curdAxios/Reviews";

function App() {
  return (
    <Routes>


      <Route path="/signup" element={<Signup />} />
      {/* ✅ PUBLIC (NO NAVBAR) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    

      {/* ✅ PROTECTED (WITH NAVBAR) */}
    
      {/* //<Route path="/app/customer" element={<CustomerProfile />} /> */}
      <Route path="/app/customerprofile" element={<CustomerProfile />} />

      <Route path="/app/customer" element={<CustomerDashboard />} />
      <Route path="/app/tailor" element={<TailorDash />} />
<Route path="/app/findtailor" element={<FindTailor />} />
<Route path="/app/reviews" element={<Reviews />} />

<Route path="/app/tailorprofile" element={<TailorProfile />} />   no navbar

    </Routes>
  );
}

export default App;