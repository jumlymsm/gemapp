import React, { useState } from "react";
import { FaGem } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// Updated ShapePicker component with enhanced SVGs for realistic gemstone visuals
const shapeSVGs = {
  Round: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <radialGradient id="roundGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#roundGradient)" stroke="#999" strokeWidth="2" />
      <path d="M50 2 L70 30 L98 50 L70 70 L50 98 L30 70 L2 50 L30 30 Z" fill="none" stroke="#666" strokeWidth="1.5" />
    </svg>
  ),
  Oval: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <radialGradient id="ovalGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="50" rx="40" ry="48" fill="url(#ovalGradient)" stroke="#999" strokeWidth="2" />
      <path d="M50 2 Q70 20 98 50 Q70 80 50 98 Q30 80 2 50 Q30 20 50 2 Z" fill="none" stroke="#666" strokeWidth="1.5" />
    </svg>
  ),
  Emerald: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" rx="10" fill="url(#emeraldGradient)" stroke="#999" strokeWidth="2" />
      <path d="M10 10 L30 2 L70 2 L90 10 L90 90 L70 98 L30 98 L10 90 Z" fill="none" stroke="#666" strokeWidth="1.5" />
    </svg>
  ),
  Princess: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="princessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M10 10 L50 2 L90 10 L78 50 L90 90 L50 78 L10 90 L22 50 Z" fill="url(#princessGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Pear: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="pearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M50 2 C70 2, 98 38, 50 98 C2 38, 30 2, 50 2 Z" fill="url(#pearGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Marquise: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="marquiseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M50 2 L98 50 L50 98 L2 50 Z" fill="url(#marquiseGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Radiant: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="radiantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="url(#radiantGradient)" stroke="#999" strokeWidth="2" />
      <path d="M10 10 L50 2 L90 10 L78 50 L90 90 L50 78 L10 90 L22 50 Z" fill="none" stroke="#666" strokeWidth="1.5" />
    </svg>
  ),
  Cushion: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="cushionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#cushionGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M50 91 C20 71, 0 54, 0 35 C0 16, 16 0, 35 0 C50 0, 50 28, 50 28 C50 28, 50 0, 65 0 C84 0, 100 16, 100 35 C100 54, 80 71, 50 91 Z" fill="url(#heartGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Asscher: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="asscherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="url(#asscherGradient)" stroke="#999" strokeWidth="2" />
      <path d="M10 10 L50 2 L90 10 L78 50 L90 90 L50 78 L10 90 L22 50 Z" fill="none" stroke="#666" strokeWidth="1.5" />
    </svg>
  ),
  Baguette: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="baguetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="30" rx="5" fill="url(#baguetteGradient)" stroke="#999" strokeWidth="2" />
      <rect x="10" y="60" width="80" height="30" rx="5" fill="url(#baguetteGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
  Other: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-16 h-16"
    >
      <defs>
        <linearGradient id="otherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cccccc" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M10 30 L50 2 L90 30 L70 70 L90 98 L50 78 L10 98 L30 70 Z" fill="url(#otherGradient)" stroke="#999" strokeWidth="2" />
    </svg>
  ),
};

function ShapePicker({ selectedShapes, onSelect, multi = true }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {Object.entries(shapeSVGs).map(([shape, SVG]) => (
        <button
          key={shape}
          onClick={() => {
            if (multi) {
              onSelect(
                selectedShapes.includes(shape)
                  ? selectedShapes.filter((s) => s !== shape)
                  : [...selectedShapes, shape]
              );
            } else {
              onSelect([shape]);
            }
          }}
          className={`relative p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400
            ${selectedShapes.includes(shape) ? "border-yellow-600 shadow-lg bg-yellow-50" : "border-gray-200 bg-white"}`}
        >
          <div className="flex justify-center items-center">{SVG}</div>
          <span className="block mt-2 text-center text-sm font-medium text-gray-700">{shape}</span>
          {selectedShapes.includes(shape) && (
            <div className="absolute inset-0 rounded-lg border-4 border-yellow-500 pointer-events-none"></div>
          )}
        </button>
      ))}
    </div>
  );
}

const gemTypes = ["Diamond", "Sapphire", "Ruby", "Emerald", "Other"];
const colorCategories = [
  { label: "White & Colorless", value: "white", accent: "bg-gray-100 text-gray-800" },
  { label: "Fancy Colored", value: "fancy", accent: "bg-yellow-100 text-yellow-900 border-yellow-400" },
];

const shapeList = [
  "Round",
  "Emerald",
  "Marquise",
  "Pear",
  "Princess",
  "Radiant",
  "Asscher",
  "Baguette",
  "Heart",
  "Cushion",
  "Other",
];

const certifications = ["GIA", "AGS", "IGI", "HRD", "EGL", "Other"];
const enhancements = [
  "Laser Drilling",
  "Fracture Filling",
  "HPHT",
  "Irradiation",
  "Coating",
];

function CreateListing() {
  const [gemType, setGemType] = useState("Diamond");
  const [colorCategory, setColorCategory] = useState("white");
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [carat, setCarat] = useState(1.0);
  const [price, setPrice] = useState(5000);
  const [tablePct, setTablePct] = useState(57);
  const [depthPct, setDepthPct] = useState(62);
  const [ratio, setRatio] = useState(1.0);
  const [clarity, setClarity] = useState("");
  const [cut, setCut] = useState("");
  const [polish, setPolish] = useState("");
  const [symmetry, setSymmetry] = useState("");
  const [certs, setCerts] = useState([]);
  const [enhance, setEnhance] = useState([]);
  const [comments, setComments] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const navigate = useNavigate();

  const handleShapeSelect = (shape) => {
    setSelectedShapes((prev) =>
      prev.includes(shape) ? prev.filter((s) => s !== shape) : [...prev, shape]
    );
  };

  const handleCertChange = (cert) => {
    setCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleEnhanceChange = (enh) => {
    setEnhance((prev) =>
      prev.includes(enh) ? prev.filter((e) => e !== enh) : [...prev, enh]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful submit, route to payment page
    navigate("/payment", { state: { gem: { name: gemType + (selectedShapes.length ? ` (${selectedShapes.join(", ")})` : ""), duration: "30 days", amount: price } } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a Gemstone Listing</h1>

        {/* Gem Type and Color Category */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Gem Type</h2>
            <div className="flex gap-2">
              {gemTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setGemType(type)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400
                    ${gemType === type ? "bg-yellow-200 border-yellow-400 text-yellow-900" : "bg-white border-gray-200 text-gray-700"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Color Category</h2>
            <div className="flex gap-2">
              {colorCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setColorCategory(category.value)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400
                    ${colorCategory === category.value ? category.accent : "bg-white border-gray-200 text-gray-700"}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shape Picker Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Gemstone Shape</h2>
          <ShapePicker
            selectedShapes={selectedShapes}
            onSelect={setSelectedShapes}
            multi={true}
          />
        </div>

        {/* Core Attributes */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carat</label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={carat}
              onChange={(e) => setCarat(e.target.value)}
              className="w-full"
            />
            <span className="block text-sm text-gray-500 mt-1">{carat} ct</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <span className="block text-sm text-gray-500 mt-1">${price}</span>
          </div>
        </div>

        {/* Certification & Enhancements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Certifications</h2>
          <div className="flex gap-2 flex-wrap">
            {certifications.map((cert) => (
              <button
                key={cert}
                onClick={() => handleCertChange(cert)}
                className={`px-4 py-2 rounded-lg border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400
                  ${certs.includes(cert) ? "bg-yellow-200 border-yellow-400 text-yellow-900" : "bg-white border-gray-200 text-gray-700"}`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {/* Comments & Contact */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
          ></textarea>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold text-lg mt-6 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
