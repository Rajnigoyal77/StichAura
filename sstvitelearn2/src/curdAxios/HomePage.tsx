//import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen bg-[#111] text-white font-sans overflow-x-hidden">

      {/* HEADER
      <header className="w-full sticky top-0 z-50 bg-[#111] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-amber-400/20">

        <div className="flex items-center gap-3">

          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />

          <h1 className="text-xl sm:text-2xl font-bold tracking-wide whitespace-nowrap">
  Stitch<span className="text-amber-400">Aura 🧵</span>
</h1>

        </div>

        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-300">

          {/* <Link to="/" className="hover:text-white">
            Home
          </Link> */}

   <header className="w-full sticky top-0 z-50 bg-[#111] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-amber-400/20">

  {/* LEFT: LOGO */}
  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

    <img
      src="/logo.jpg"
      alt="Logo"
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
    />

    <h1 className="text-lg sm:text-2xl font-bold whitespace-nowrap">
      Stitch<span className="text-amber-400">Aura 🧵</span>
    </h1>

  </div>

  {/* RIGHT NAV */}
  <nav className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base flex-shrink-0">

    <a href="#home" className="hover:text-white transition whitespace-nowrap">
      Home
    </a>

    <Link
      to="/signup"
      className="bg-amber-400 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-amber-500 transition font-semibold whitespace-nowrap"
    >
      Signup
    </Link>

    <Link
      to="/login"
      className="hover:text-amber-400 transition whitespace-nowrap"
    >
      Login
    </Link>

  </nav>

</header>

      {/* HERO */}
      <section className="w-full min-h-screen grid md:grid-cols-2">

        {/* LEFT */}
        <div className="flex
         flex-col justify-center px-6 sm:px-12 md:px-20 bg-gradient-to-br from-[#1a1a1a] to-[#3b2f2a]">

          <p className="text-amber-400 mb-4 tracking-widest text-sm">
            ESTD 2015 • PREMIUM TAILORING
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
            Crafting <br /> Perfect Fits
          </h1>

          <p className="mt-6 text-gray-400 max-w-md leading-8">
            Experience luxury tailoring with precision, elegance, and style.
            Designed for perfection, made for you.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">

            <Link
              to="/app/findtailor"
              className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition"
            >
              Explore Tailors
            </Link>

            <Link
              to="/signup"
              className="border border-gray-500 px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Get Started
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-full">

          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url(https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-tailor-mockup-background5-13-06-83a1c44d417617d550ab07cf9c09fd5d86173372c0924d807ba1fb2a1082ab72.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="grid md:grid-cols-4 text-center py-12 bg-[#1a1a1a]">

        {[
          { num: "20K+", text: "Happy Clients" },
          { num: "500+", text: "Expert Tailors" },
          { num: "10K+", text: "Orders Completed" },
          { num: "4.9★", text: "Customer Rating" },
        ].map((item, i) => (
          <div key={i}>

            <h2 className="text-3xl font-bold text-amber-400">
              {item.num}
            </h2>

            <p className="text-gray-400 mt-2">
              {item.text}
            </p>

          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 text-center">

        <h2 className="text-4xl font-bold mb-12">
          Our Expertise
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            { name: "Suit", img: "/suits.jpg" },
            { name: "Lehenga", img: "/lehnga.jpg" },
            { name: "Kurta", img: "/kurtas.jpg" },
            { name: "Blouse", img: "/blouses.jpg" },
            
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-6 rounded-2xl hover:scale-105 transition shadow-lg border border-gray-700"
            >

              <img
                src={item.img}
                alt={item.name}
                className="rounded-xl mb-4 w-full h-64 object-cover"
              />

              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2b1f1a] to-[#111] text-center">

        <h2 className="text-4xl font-bold mb-12">
          Why Choose StitchAura?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            "Perfect Custom Fit",
            "Luxury Fabrics",
            "Expert Craftsmanship",
          ].map((text, i) => (
            <div
              key={i}
              className="p-8 border border-amber-400/20 rounded-xl"
            >

              <h3 className="text-xl font-semibold text-amber-400">
                {text}
              </h3>

            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6 bg-[#111]">

        <h2 className="text-4xl font-bold text-center mb-14 text-amber-400">
          Benefits of StitchAura ✨
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* CUSTOMER */}
          <div className="bg-black border border-amber-400/20 rounded-2xl p-8">

            <h3 className="text-3xl font-bold text-amber-400 mb-6">
              For Customers 👗
            </h3>

            <ul className="space-y-4 text-gray-300 leading-8">
              <li>✔ Find trusted tailors easily</li>
              <li>✔ Explore modern stitching services</li>
              <li>✔ Read reviews before choosing</li>
              <li>✔ Premium tailoring experience</li>
            </ul>

          </div>

          {/* TAILORS */}
          <div className="bg-black border border-amber-400/20 rounded-2xl p-8">

            <h3 className="text-3xl font-bold text-amber-400 mb-6">
              For Tailors ✂️
            </h3>

            <ul className="space-y-4 text-gray-300 leading-8">
              <li>✔ Reach more customers online</li>
              <li>✔ Build trust through ratings</li>
              <li>✔ Manage tailoring profile easily</li>
              <li>✔ Grow tailoring business digitally</li>
            </ul>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-[#1a1a1a] text-center">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-amber-400">
            What Our Clients Say
          </h2>

          <p className="text-gray-400 mt-3">
            Trusted by fashion lovers for premium tailoring experiences.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Amazing fit!",
            "Loved the design!",
            "Best tailor ever!",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 border border-gray-700 rounded-xl"
            >

              <p className="text-gray-300">
                "{text}"
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* DEVELOPER */}
      <section className="py-20 text-center bg-gradient-to-br from-black via-[#12000c] to-black">

        <h2 className="text-4xl font-bold mb-8 text-amber-400">
          Crafted By 👩🏻‍💻
        </h2>

        <img
          src="/janvi.jpg"
          className="w-32 h-32 rounded-full mx-auto mb-5 object-cover border-4 border-amber-400"
        />

        <h3 className="text-2xl font-semibold">
          Rajni Goyal
        </h3>

        <p className="text-gray-400 mt-2">
          Full Stack Developer
        </p>

        <p className="text-gray-300 max-w-3xl mx-auto mt-8 leading-8 text-lg px-6">
          Hello, I'm Rajni Goyal — a passionate Full Stack Developer who enjoys building modern and useful web applications. StitchAura is created to help
           local home-based tailors get better work opportunities and fair payment for their skills. Many customers also struggle to find trusted tailors nearby, 
           so this platform connects both customers and tailors through a simple and user-friendly experience.

        </p>

        {/* LINKEDIN */}
        <div className="mt-8">

          <a
            href="https://www.linkedin.com/in/rajni-goyal-2b271a331"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:text-amber-500 underline text-lg"
          >
            Visit My LinkedIn Profile
          </a>

        </div>
      </section>

      {/* QUERY */}
      <section className="py-20 px-6 bg-[#111] text-center">

        <h2 className="text-4xl font-bold text-amber-400 mb-6">
          Any Query? 💌
        </h2>

        <p className="text-gray-300 text-lg leading-8 max-w-3xl mx-auto">
          If you have any questions, suggestions, or feedback regarding
          StitchAura, feel free to contact anytime.
        </p>

        <div className="mt-8">

          <p className="text-white text-xl font-semibold">
            Contact Gmail
          </p>

          <a
            href="mailto:goyaljanvi77196@gmail.com"
            className="text-amber-400 hover:text-amber-500 underline text-lg"
          >
            goyaljanvi77196@gmail.com
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-10 text-center border-t border-gray-800">

        <h2 className="text-xl font-bold">
          Stitch<span className="text-amber-400">Aura</span>
        </h2>

        <p className="text-gray-500 mt-2">
          Luxury Tailoring Experience
        </p>

        <div className="mt-4 space-x-6">

          <Link to="/">Home</Link>

          <Link to="/app/findTailor">
            Find Tailor
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

        <p className="text-gray-600 mt-6 text-sm">
          © 2026 All Rights Reserved
        </p>

      </footer>
    </div>
  );
}