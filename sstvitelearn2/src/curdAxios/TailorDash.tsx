import { useNavigate } from "react-router-dom";

export default function TailorDash() {

  const navigate = useNavigate();

  // 🔥 FUNCTIONS
  function openProfile() {
    navigate("/app/tailorprofile");
  }

  function goBack() {
    navigate(-1);
  }

  function doLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#12000c] to-black">

      {/* TOP BAR */}
      <div className="bg-black border-b border-pink-500/20 px-6 py-4 flex items-center justify-between">

        {/* APP NAME */}
        <h1 className="text-3xl font-bold text-white">
          Stich<span className="text-amber-400">Aura</span> 🧵
        </h1>

        {/* BUTTONS */}
        <div className="flex gap-4">

          {/* BACK */}
          <button
            onClick={goBack}
            className="bg-[#111] hover:bg-pink-500 transition text-black px-5 py-2 rounded-lg border border-pink-500/20"
          >
           Back← 
          </button>

          {/* PROFILE */}
          <button
            onClick={openProfile}
            className="bg-pink-500 hover:bg-pink-600 transition text-black px-5 py-2 rounded-lg font-semibold"
          >
            Profile
          </button>

          {/* LOGOUT */}
          <button
            onClick={doLogout}
            className="bg-red-500 hover:bg-red-600 transition text-black px-5 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">

        {/* TITLE */}
        <h1 className="text-5xl font-bold text-pink-500 mb-5 text-center">
        Tailor Workspace ✂️
        </h1>

        {/* PARAGRAPH */}
        <p className="text-gray-400 text-center max-w-2xl mb-14 text-lg leading-8">
          Manage your tailoring services, profile details, and customer
          interactions with elegance and simplicity.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* PROFILE */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[280px]">

            <div className="text-5xl mb-4">👔</div>

            <h2 className="text-2xl font-semibold mb-3 text-white">
              Tailor Profile
            </h2>

            <p className="text-gray-400 text-sm mb-7 leading-6">
              View and manage your tailor profile, services and details.
            </p>

            <button
              onClick={openProfile}
              className="bg-pink-500 hover:bg-pink-600 text-black px-7 py-2 rounded-lg font-semibold"
            >
              Open Profile
            </button>

          </div>

          {/* ORDERS
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[280px]">

            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-2xl font-semibold mb-3 text-white">
              Orders
            </h2>

            <p className="text-gray-400 text-sm mb-7 leading-6">
              Manage stitching requests and customer tailoring orders.
            </p>

            <button
              className="bg-pink-500 hover:bg-pink-600 text-black px-7 py-2 rounded-lg font-semibold"
            >
              View Orders
            </button>

          </div> */}

          {/* LOGOUT */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[280px]">

            <div className="text-5xl mb-4">🚪</div>

            <h2 className="text-2xl font-semibold mb-3 text-white">
              Logout
            </h2>

            <p className="text-gray-400 text-sm mb-7 leading-6">
              Securely logout from your tailor dashboard account.
            </p>

            <button
              onClick={doLogout}
              className="bg-red-500 hover:bg-red-600 text-black px-7 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black border-t border-pink-500/20 text-center py-5">

        <h2 className="text-white text-xl font-semibold mb-2">
          Stich<span className="text-pink-500">Aura</span>
        </h2>

        <p className="text-gray-400 text-sm">
          Premium Tailoring Experience
        </p>

        <p className="text-gray-500 text-sm mt-2">
          © 2026 StichAura. All rights reserved.
        </p>

      </footer>
    </div>
  );
}