import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiUser, FiSearch, FiX } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GemLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
      fill="currentColor"
    ></path>
  </svg>
);

const HeroSection = () => (
  <section
    className="flex flex-col items-center justify-center min-h-[400px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md mb-8"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80')" }}
  >
    <div className="relative z-10 text-center text-white px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-4">Find your perfect gem</h1>
      <p className="text-lg mb-6">Discover a wide selection of gemstones from trusted sellers. Start your search today and find the perfect gem for your collection or jewelry.</p>
    </div>
  </section>
);

const FeaturedGems = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Gems</h2>
      <Slider {...settings} className="rounded-lg shadow-md">
        {featuredGems.map((gem) => (
          <div key={gem.name} className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${gem.image})` }}
              ></div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{gem.name}</h3>
                <p className="text-sm text-gray-500">{gem.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

const PopularGemTypes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Gem Types</h2>
      <Slider {...settings} className="rounded-lg shadow-md">
        {popularGems.map((gem) => (
          <div key={gem.name} className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${gem.image})` }}
              ></div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4 text-center">{gem.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

const SearchResults = ({ results }) => {
  const [selectedGem, setSelectedGem] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((gem) => (
            <div
              key={gem.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onDoubleClick={() => setSelectedGem(gem)}
            >
              <img
                src={gem.image}
                alt={gem.name}
                className="w-[3cm] h-[3cm] object-cover rounded-t-lg mx-auto mt-4"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{gem.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{gem.description}</p>
                <p className="text-sm text-gray-700 font-medium">Price: ${gem.price}</p>
                <p className="text-sm text-gray-500">Location: {gem.location}</p>
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setSelectedGem(gem)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedGem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedGem(null)}
              >
                <FiX size={24} />
              </button>
              <img
                src={selectedGem.image}
                alt={selectedGem.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedGem.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedGem.description}</p>
              <p className="text-sm text-gray-700 font-medium mb-2">Price: ${selectedGem.price}</p>
              <p className="text-sm text-gray-500 mb-2">Location: {selectedGem.location}</p>
              <p className="text-sm text-gray-500 mb-4">Contact: {selectedGem.contact}</p>
              <a
                href={`https://wa.me/${selectedGem.contact}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <FaWhatsapp className="mr-2" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const featuredGems = [
  {
    name: "Amethyst",
    description: "Vibrant purple amethyst",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ugCxAFSTvwOzWbxi3MwlrqluFoVluI6dKhGwEXriah2WcYwOgBW1IFoFPQpCzhTnzaB3pkkleEKxhI7wWEqGLrtthjZ-ku7qaoo8Oiu55G2Qhk_wPWgRJezydeFstiBMhGQ0GDViwYnAWzW0RNL5NrcfHl4EtF_a6LsHe-ZvexRfl0pn1cMGsR5G9fgTMuxzaGPpA_j7XJG-J83MHWE9lPw_hZjxWrx97WNmSe09hpwsgxRNYwYRvBfsuG_wFwCgR6RHB77iqso",
  },
  {
    name: "Ruby",
    description: "Deep red ruby",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY0YGeLORX-hSpkwS1Uibvsf2W6gc7Ce65_F9DlrMWDGIzRNaIFNCh6n5M5N76P_F3zQkR6yH47o4zINiZpf4lQo1ly1GeE4D654L_Gm2qiodPbh1y7hSRnmxpi_EiPkgOlKr9Dw3euoX-c-_PpaYKtxUWwW8Y0z60okAz1mLLO1ESRWqvnULsD9O5kFS4NmiVPfPDPRj99W1qH4DRh8jnk84fHkT1QhTFCI-XDjeDevaQ6PsWUx4n_ZbDr1BE7Rhdzqv0NPQ",
  },
  {
    name: "Sapphire",
    description: "Classic blue sapphire",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUqwAa__D2IIT728e5-J1N-qZVSRO7mixNViYncMFD0YzpzlVVvXH5mzbkpwFwFIC1SJllniC2mwe7JxHhbPVC1TmQK5MHehXlEIoxfV4ZWpiL6ng7LrMwCHZz3CV5dUlvNUeLoZAGg0Ac9yHyZ3y4JGEVEF_MprXRux9Q12YLbFzYvUGvT6DQEmrzFpAB2obCouW2bckylWUma9tzK7L5Q8WpoI5wY1qZs7ZNI8LVZqvOvTzfxK-cV3Sbin3H28BzUqH6Mi2-Gw",
  },
  {
    name: "Emerald",
    description: "Rich green emerald",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Diamond",
    description: "Brilliant cut diamond",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Topaz",
    description: "Golden topaz",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pearl",
    description: "Lustrous white pearl",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Opal",
    description: "Iridescent opal",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
  },
];

const popularGems = [
  {
    name: "Amethyst",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ugCxAFSTvwOzWbxi3MwlrqluFoVluI6dKhGwEXriah2WcYwOgBW1IFoFPQpCzhTnzaB3pkkleEKxhI7wWEqGLrtthjZ-ku7qaoo8Oiu55G2Qhk_wPWgRJezydeFstiBMhGQ0GDViwYnAWzW0RNL5NrcfHl4EtF_a6LsHe-ZvexRfl0pn1cMGsR5G9fgTMuxzaGPpA_j7XJG-J83MHWE9lPw_hZjxWrx97WNmSe09hpwsgxRNYwYRvBfsuG_wFwCgR6RHB77iqso",
  },
  {
    name: "Ruby",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY0YGeLORX-hSpkwS1Uibvsf2W6gc7Ce65_F9DlrMWDGIzRNaIFNCh6n5M5N76P_F3zQkR6yH47o4zINiZpf4lQo1ly1GeE4D654L_Gm2qiodPbh1y7hSRnmxpi_EiPkgOlKr9Dw3euoX-c-_PpaYKtxUWwW8Y0z60okAz1mLLO1ESRWqvnULsD9O5kFS4NmiVPfPDPRj99W1qH4DRh8jnk84fHkT1QhTFCI-XDjeDevaQ6PsWUx4n_ZbDr1BE7Rhdzqv0NPQ",
  },
  {
    name: "Sapphire",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUqwAa__D2IIT728e5-J1N-qZVSRO7mixNViYncMFD0YzpzlVVvXH5mzbkpwFwFIC1SJllniC2mwe7JxHhbPVC1TmQK5MHehXlEIoxfV4ZWpiL6ng7LrMwCHZz3CV5dUlvNUeLoZAGg0Ac9yHyZ3y4JGEVEF_MprXRux9Q12YLbFzYvUGvT6DQEmrzFpAB2obCouW2bckylWUma9tzK7L5Q8WpoI5wY1qZs7ZNI8LVZqvOvTzfxK-cV3Sbin3H28BzUqH6Mi2-Gw",
  },
  {
    name: "Emerald",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Topaz",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pearl",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Opal",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate("/listing", { state: { query: searchQuery } });
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <HeroSection />
        <div className="flex items-center justify-center mt-6 mb-10">
          <input
            type="text"
            placeholder="Search for gems"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-l-lg border-none bg-gray-200 text-gray-900 w-full max-w-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        <FeaturedGems />
        <PopularGemTypes />
        {/* Admin Page Link */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/admin')}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-900 transition font-semibold"
          >
            Go to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
