import React, { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp, FiEye, FiHeart, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const gemColors = [
  "Blue",
  "Green",
  "Pink",
  "Yellow",
  "Brown",
  "Red",
  "Black",
  "Violet",
  "Purple",
  "Golden",
  "Other",
];
const clarityGrades = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
];
const cutGrades = ["Excellent/Ideal", "Very Good", "Good", "Any"];
const polishSymmetryGrades = ["Ideal", "Excellent", "Very Good", "Good", "Fair", "Poor"];
const labs = [
  "GIA",
  "EGLUSA",
  "EGLNY",
  "EGLIA",
  "AGS",
  "PGS",
  "IGI",
  "HRD",
  "AGA",
  "Other",
];
const enhancementTypes = [
  "None",
  "Clarity Enhanced",
  "HPTP Process",
  "Laser Drilled",
  "Irradiated",
];
const gemTypes = ["Diamond", "Emerald", "Ruby", "Sapphire", "Topaz", "Pearl", "Other"];
const shapes = [
  "Round",
  "Oval",
  "Princess",
  "Cushion",
  "Pear",
  "Marquise",
  "Heart",
  "Asscher",
  "Radiant",
  "Emerald",
  "Other",
];
const fluorescenceTypes = ["None", "Faint", "Medium", "Strong", "Very Strong"];

// Updated sample data with all required fields for the new UI
const sampleGems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    name: "Purple Sapphire",
    carat: 2.45,
    ratti: 2.72,
    shape: "Oval",
    cut: "Faceted",
    composition: "Natural",
    certificateType: "GIA",
    certificateNumber: "PS-2025-001",
    treatment: "No Heat",
    dimension: "8.52mm X 6.24mm X 4.77mm",
    dimensionType: "Not Calibrated",
    origin: "Sri Lanka",
    location: "Sri Lanka (Ceylon)",
    color: "Purple",
    price: 3620,
    description: "A stunning natural purple sapphire with excellent clarity and no heat treatment.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    name: "Blue Diamond",
    carat: 1.12,
    ratti: 1.23,
    shape: "Round",
    cut: "Brilliant",
    composition: "Natural",
    certificateType: "IGI",
    certificateNumber: "BD-2025-002",
    treatment: "None",
    dimension: "6.50mm X 6.50mm X 4.00mm",
    dimensionType: "Calibrated",
    origin: "South Africa",
    location: "London, UK",
    color: "Blue",
    price: 12800,
    description: "Rare blue diamond with exceptional brilliance and IGI certification.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    name: "Golden Topaz",
    carat: 3.01,
    ratti: 3.32,
    shape: "Cushion",
    cut: "Step",
    composition: "Natural",
    certificateType: "HRD",
    certificateNumber: "GT-2025-003",
    treatment: "Irradiated",
    dimension: "9.10mm X 7.80mm X 5.20mm",
    dimensionType: "Not Calibrated",
    origin: "Brazil",
    location: "Paris, France",
    color: "Golden",
    price: 950,
    description: "Vivid golden topaz, beautifully cut and certified by HRD.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    name: "White Pearl",
    carat: 2.00,
    ratti: 2.20,
    shape: "Round",
    cut: "Smooth",
    composition: "Natural",
    certificateType: "PGS",
    certificateNumber: "WP-2025-004",
    treatment: "None",
    dimension: "7.00mm X 7.00mm X 7.00mm",
    dimensionType: "Calibrated",
    origin: "Japan",
    location: "Tokyo, Japan",
    color: "White",
    price: 420,
    description: "Lustrous natural white pearl, perfectly round and smooth.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1465101053361-763ab02bced9?auto=format&fit=crop&w=600&q=80",
    name: "Emerald",
    carat: 1.88,
    ratti: 2.07,
    shape: "Emerald",
    cut: "Step",
    composition: "Natural",
    certificateType: "GIA",
    certificateNumber: "EM-2025-005",
    treatment: "Oiled",
    dimension: "8.00mm X 6.00mm X 4.00mm",
    dimensionType: "Not Calibrated",
    origin: "Colombia",
    location: "New York, USA",
    color: "Green",
    price: 2100,
    description: "Rich green Colombian emerald, classic step cut, GIA certified.",
  },
];

const Listing = () => {
  const [selectedGem, setSelectedGem] = useState(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    color: [],
    carat: [0.25, 10.25],
    price: [0, 10000],
    priceType: "total",
    table: [50, 80],
    depth: [50, 80],
    clarity: [],
    cut: "Any",
    polish: "Any",
    symmetry: "Any",
    ratio: [1.0, 2.75],
    dimensions: { length: "", width: "", depth: "" },
    lab: [],
    labOther: "",
    enhancement: [],
    origin: "",
    gemType: "",
    shape: "",
    fluorescence: "",
    provenance: ""
  });
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const handleCheckboxChange = (field, option) => {
    setFilters((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(option)
          ? arr.filter((v) => v !== option)
          : [...arr, option],
      };
    });
  };
  const handleDimensionChange = (dim, value) => {
    setFilters((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dim]: value },
    }));
  };
  const handleLabOtherChange = (value) => {
    setFilters((prev) => ({ ...prev, labOther: value }));
  };
  const handleSliderChange = (field, idx, value) => {
    setFilters((prev) => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setIsAdvancedSearchOpen(false);
  };

  // Filtering logic
  const filteredGems =
    searchQuery.trim() === "" && !appliedFilters
      ? sampleGems
      : sampleGems.filter((gem) => {
          if (searchQuery && !gem.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }
          if (appliedFilters) {
            if (appliedFilters.color.length && !appliedFilters.color.includes(gem.color))
              return false;
            if (
              gem.carat &&
              (gem.carat < appliedFilters.carat[0] || gem.carat > appliedFilters.carat[1])
            )
              return false;
            if (
              gem.price &&
              (gem.price < appliedFilters.price[0] || gem.price > appliedFilters.price[1])
            )
              return false;
            if (appliedFilters.clarity.length && !appliedFilters.clarity.includes(gem.clarity))
              return false;
            if (
              appliedFilters.gemType &&
              appliedFilters.gemType !== "" &&
              gem.type !== appliedFilters.gemType
            )
              return false;
            if (
              appliedFilters.shape &&
              appliedFilters.shape !== "" &&
              gem.shape !== appliedFilters.shape
            )
              return false;
            if (
              appliedFilters.origin &&
              appliedFilters.origin !== "" &&
              gem.origin !== appliedFilters.origin
            )
              return false;
            if (appliedFilters.lab.length && !appliedFilters.lab.includes(gem.lab)) return false;
            if (
              appliedFilters.enhancement.length &&
              !appliedFilters.enhancement.includes(gem.enhancement)
            )
              return false;
          }          return true;
        }
      );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <main className="flex-1 p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Gem Listings</h1>
          {/* Gems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch bg-slate-50 p-2">
            {filteredGems.length === 0 ? (
              <div className="col-span-full text-center text-red-600 font-semibold py-8">
                No results found.
              </div>
            ) : (
              filteredGems.map((gem) => (
                <div
                  key={gem.id}
                  className="flex flex-col justify-between min-h-[400px] h-full bg-white rounded-xl shadow p-3 mx-auto w-64 max-w-full transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
                  style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
                  onDoubleClick={() => setSelectedGem(gem)}
                >
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-36 object-cover rounded-lg mb-2 border border-gray-100 shadow"
                    style={{ boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)' }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 text-center truncate w-full mb-1">
                      {gem.name} – {gem.carat} Carat
                    </h3>
                    <p className="text-xs text-gray-500 text-center mb-0 truncate w-full">
                      Location: {gem.location}
                    </p>
                    <p className="text-xs text-gray-500 text-center mb-1 truncate w-full">
                      Origin: {gem.origin}
                    </p>
                    <div className="text-base font-bold text-blue-700 text-center mb-2" style={{ margin: 0, padding: 0 }}>
                      US ${gem.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 font-semibold shadow text-xs w-full mt-2 mb-0"
                    style={{ minHeight: 'unset', minWidth: 'unset', marginBottom: 0 }}
                    onClick={e => { e.stopPropagation(); setSelectedGem(gem); }}
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal for Gem Details */}
        {selectedGem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setSelectedGem(null)}
              >
                <FiX size={28} />
              </button>
              <img
                src={selectedGem.image}
                alt={selectedGem.name}
                className="object-cover w-[3cm] h-[3cm] rounded-xl shadow mb-6 mx-auto border border-gray-100"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {selectedGem.name} – {selectedGem.carat} Carat
              </h2>
              <div className="space-y-2 text-gray-700 text-base">
                <div><span className="font-semibold">Description:</span> {selectedGem.description}</div>
                <div><span className="font-semibold">Weight Carat:</span> {selectedGem.carat}</div>
                <div><span className="font-semibold">Weight Ratti:</span> {selectedGem.ratti}</div>
                <div><span className="font-semibold">Shape:</span> {selectedGem.shape}</div>
                <div><span className="font-semibold">Cut:</span> {selectedGem.cut}</div>
                <div><span className="font-semibold">Composition:</span> {selectedGem.composition}</div>
                <div><span className="font-semibold">Certificate Type:</span> {selectedGem.certificateType}</div>
                <div><span className="font-semibold">Certificate Number:</span> {selectedGem.certificateNumber}</div>
                <div><span className="font-semibold">Treatment:</span> {selectedGem.treatment}</div>
                <div><span className="font-semibold">Dimension:</span> {selectedGem.dimension}</div>
                <div><span className="font-semibold">Dimension Type:</span> {selectedGem.dimensionType}</div>
                <div><span className="font-semibold">Origin:</span> {selectedGem.origin}</div>
                <div><span className="font-semibold">Color:</span> {selectedGem.color}</div>
                <div className="font-bold text-blue-700 text-xl mt-4 text-center">
                  US ${selectedGem.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        &copy; 2025 Gem Marketplace. All rights reserved.
      </footer>
    </div>
  );
};

export default Listing;
