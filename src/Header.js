import React, { useState, useEffect } from "react";
import { FaUserCircle, FaGlobe, FaDollarSign, FaBars, FaTimes } from "react-icons/fa";

const isAuthenticated = false; // Replace with real auth logic

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-3 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md shadow-lg bg-opacity-90" : ""
      }`}
      style={{backdropFilter: scrolled ? 'blur(8px)' : 'none'}}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo & Brand */}
        <a href="/" className="flex items-center min-w-0">
          <img
            src="/newlogo.jpg"
            alt="Gem Find Logo"
            className="h-12 w-12 mr-3 rounded-full bg-white p-1 shadow border-2 border-blue-700"
            width={48}
            height={48}
            onError={e => { e.target.onerror = null; e.target.src = '/logo192.png'; }}
          />
          <span className="text-2xl font-extrabold tracking-tight text-blue-900 whitespace-nowrap" style={{fontFamily: 'Montserrat, sans-serif', letterSpacing: 1}}>
            GEM FIND
          </span>
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6 items-center">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li className="relative group">
              <a href="/browse" className="hover:underline">Browse Gems</a>
              {/* Dropdown example */}
              <div className="absolute left-0 mt-2 w-40 bg-white text-blue-900 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                <a href="/browse?type=diamond" className="block px-4 py-2 hover:bg-blue-50">Diamonds</a>
                <a href="/browse?type=sapphire" className="block px-4 py-2 hover:bg-blue-50">Sapphires</a>
                <a href="/browse?type=emerald" className="block px-4 py-2 hover:bg-blue-50">Emeralds</a>
              </div>
            </li>
          </ul>
        </nav>
        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          {/* Language/Currency Switcher */}
          <button className="p-2 rounded-full hover:bg-blue-800 transition" title="Change Language">
            <FaGlobe size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-800 transition" title="Change Currency">
            <FaDollarSign size={18} />
          </button>
          {/* Auth/User */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 focus:outline-none">
                <FaUserCircle size={28} />
                <span className="hidden lg:inline">Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white text-blue-900 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                <a href="/profile" className="block px-4 py-2 hover:bg-blue-50">Profile</a>
                <a href="/logout" className="block px-4 py-2 hover:bg-blue-50">Logout</a>
              </div>
            </div>
          ) : (
            <>
              <a href="/login" className="px-3 py-1 rounded hover:bg-blue-800 transition">Login</a>
              <a href="/login2" className="px-3 py-1 rounded hover:bg-blue-800 transition">Login2</a>
              <a href="/signup2" className="px-3 py-1 rounded hover:bg-blue-800 transition">Sign Up</a>
            </>
          )}
          {/* Create Listing Button */}
          <a
            href="/create-listing"
            className="ml-2 px-4 py-2 rounded-full font-semibold bg-yellow-400 text-blue-900 shadow-md hover:bg-yellow-300 transition border-2 border-yellow-300"
            style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'}}
          >
            Create Listing
          </a>
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-blue-900 bg-opacity-90 z-40 transition-all duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
        style={{backdropFilter: 'blur(8px)', pointerEvents: menuOpen ? 'auto' : 'none'}}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <a href="/" className="flex items-center min-w-0" onClick={()=>setMenuOpen(false)}>
            <img
              src="/newlogo.jpg"
              alt="Gem Find Logo"
              className="h-10 w-10 mr-2 rounded-full bg-white p-1 shadow border-2 border-blue-700"
              width={40}
              height={40}
              onError={e => { e.target.onerror = null; e.target.src = '/logo192.png'; }}
            />
            <span className="text-xl font-extrabold tracking-tight text-blue-100" style={{fontFamily: 'Montserrat, sans-serif', letterSpacing: 1}}>
              GEM FIND
            </span>
          </a>
          <button onClick={()=>setMenuOpen(false)} className="p-2 rounded-full hover:bg-blue-800 transition" aria-label="Close menu">
            <FaTimes size={26} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center space-y-6">
          <a href="/" className="text-lg font-semibold hover:underline" onClick={()=>setMenuOpen(false)}>Home</a>
          <a href="/browse" className="text-lg font-semibold hover:underline" onClick={()=>setMenuOpen(false)}>Browse Gems</a>
          <a href="/create-listing" className="w-11/12 text-center px-4 py-2 rounded-full font-semibold bg-yellow-400 text-blue-900 shadow-md hover:bg-yellow-300 transition border-2 border-yellow-300" style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'}} onClick={()=>setMenuOpen(false)}>
            Create Listing
          </a>
          <div className="flex space-x-4 mt-4">
            <button className="p-2 rounded-full hover:bg-blue-800 transition" title="Change Language">
              <FaGlobe size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-800 transition" title="Change Currency">
              <FaDollarSign size={20} />
            </button>
          </div>
          <div className="mt-4">
            {isAuthenticated ? (
              <div className="flex flex-col items-center space-y-2">
                <a href="/profile" className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-blue-800 transition">
                  <FaUserCircle size={22} /> <span>Profile</span>
                </a>
                <a href="/logout" className="px-3 py-2 rounded hover:bg-blue-800 transition">Logout</a>
              </div>
            ) : (
              <>
                <a href="/login" className="px-3 py-2 rounded hover:bg-blue-800 transition">Login</a>
                <a href="/login2" className="px-3 py-2 rounded hover:bg-blue-800 transition">Login2</a>
                <a href="/signup2" className="px-3 py-2 rounded hover:bg-blue-800 transition">Sign Up</a>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
