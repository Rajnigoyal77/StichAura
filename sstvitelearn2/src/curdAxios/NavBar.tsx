import { Outlet, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div style={{ background: "black", color: "white", padding: "10px" }}>
        <Link to="/app/customer">Customer</Link> |{" "}
        <Link to="/app/tailor">Tailor</Link> |{" "}
        <Link to="/app/findtailor">Find</Link>
      </div>

      {/* 🔥 VERY IMPORTANT */}
      <Outlet />
    </>
  );
}