import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  function doSwitchKuch(url: string) {
    navigate("/" + url.toLowerCase()); // 👈 lowercase important
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full bg-white text-black flex justify-between px-6 py-3 shadow-lg">

        <h1 className="text-xl font-bold">Nav Bar</h1>

        <div className="flex gap-4">

          <button onClick={() => doSwitchKuch("")}>
            Home
          </button>

          <button onClick={() => doSwitchKuch("login")}>
            Login
          </button>

          <button onClick={() => doSwitchKuch("signup")}>
            Signup
          </button>

          <button onClick={() => doSwitchKuch("findtailor")}>
            FindTailor
          </button>

          <button onClick={() => doSwitchKuch("customer")}>
            Customer
          </button>

          <button onClick={() => doSwitchKuch("tailor")}>
            Tailor
          </button>

          <button onClick={() => doSwitchKuch("reviews")}>
            Reviews
          </button>

        </div>
      </div>

      {/* 👇 YAHI PE PAGE LOAD HOGA */}
      <Outlet />
    </>
  );
};

export default NavBar;