import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {

  const navigate = useNavigate();

  function openProfile() {
    navigate("/app/customerProfile");
  }

  function openFindTailor() {
    navigate("/app/findtailor");
  }

  function openReviews() {
    navigate("/app/reviews");
  }

  function doLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#12000c] to-black">

      {/* TOP BAR */}
      <div className="bg-black border-b border-pink-500/20 px-6 py-3 text-white text-lg font-semibold">
        Stich<span className="text-amber-400">Aura</span> 🧵
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-pink-500 mb-9">
          Customer Dashboard 👨🏻
        </h1>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* PROFILE */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[260px]">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Profile</h2>
            <p className="text-gray-400 text-sm mb-6">
              View and manage your profile information
            </p>
            <button
              onClick={openProfile}
              className="bg-pink-500 hover:bg-pink-600 text-black px-6 py-2 rounded-lg"
            >
              Click Here
            </button>
          </div>

          {/* REVIEW */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[260px]">
            <div className="text-5xl mb-4">⭐</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Review</h2>
            <p className="text-gray-400 text-sm mb-6">
              Search your tailor and add review
            </p>
            <button
              onClick={openReviews}
              className="bg-pink-500 hover:bg-pink-600 text-black px-6 py-2 rounded-lg"
            >
              Click Here
            </button>
          </div>

          {/* SEARCH TAILORS */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[260px]">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Search Tailors</h2>
            <p className="text-gray-400 text-sm mb-6">
              Search tailors according to your requirements
            </p>
            <button
              onClick={openFindTailor}
              className="bg-pink-500 hover:bg-pink-600 text-black px-6 py-2 rounded-lg"
            >
              Click Here
            </button>
          </div>

          {/* LOGOUT */}
          <div className="bg-[#111] border border-pink-500/20 rounded-2xl shadow-md p-8 text-center w-[260px]">
            <div className="text-5xl mb-4">🚪</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Logout</h2>
            <p className="text-gray-400 text-sm mb-6">
              Sign out from your account securely.
            </p>
            <button
              onClick={doLogout}
              className="bg-red-500 hover:bg-red-600 text-black px-6 py-2 rounded-lg"
            >
              Logout
            </button>
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
  );
}