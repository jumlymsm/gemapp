import React, { useState, useMemo } from "react";
import { FaGem } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import { createListing as createListingMutation } from "./graphql/mutations";
import ListingTable from "./ListingTable";

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

// Country data for selector (ISO 3166-1 alpha-2, name, emoji flag)
const countryList = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "MM", name: "Myanmar (Burma)", flag: "🇲🇲" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "Other", name: "Other", flag: "🌍" },
];

function CountrySelector({ value, onChange }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      countryList.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow absolute w-full z-10">
        {filtered.length === 0 && (
          <div className="p-2 text-gray-500">No countries found</div>
        )}
        {filtered.map((country) => (
          <button
            key={country.code}
            type="button"
            className={`flex items-center w-full px-3 py-2 hover:bg-yellow-100 transition-all ${
              value && value.code === country.code ? "bg-yellow-50 font-semibold" : ""
            }`}
            onClick={() => {
              onChange(country);
              setSearch("");
            }}
          >
            <span className="text-2xl mr-3">{country.flag}</span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl">{value.flag}</span>
          <span className="font-medium">{value.name}</span>
          <button
            type="button"
            className="ml-2 text-xs text-red-500 hover:underline"
            onClick={() => onChange(null)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

function CreateListing() {
  const [gemType, setGemType] = useState("Diamond");
  const [colorCategory, setColorCategory] = useState("white");
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [carat, setCarat] = useState(1.0);
  const [price, setPrice] = useState(5000);
  const [tablePct, setTablePct] = useState(57);
  const [depthPct, setDepthPct] = useState(62);
  const [ratio, setRatio] = useState(1.0);
  const [fancyColor, setFancyColor] = useState("");
  const [intensity, setIntensity] = useState("");
  const [clarity, setClarity] = useState("");
  const [cutGrade, setCutGrade] = useState("");
  const [polish, setPolish] = useState("");
  const [symmetry, setSymmetry] = useState("");
  const [dimensionLength, setDimensionLength] = useState("");
  const [dimensionWidth, setDimensionWidth] = useState("");
  const [dimensionDepth, setDimensionDepth] = useState("");
  const [dimensionTolerance, setDimensionTolerance] = useState("");
  const [labs, setLabs] = useState([]);
  const [enhancements, setEnhancements] = useState([]);
  const [comments, setComments] = useState("");
  const [contact, setContact] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [images, setImages] = useState([]); // For storing selected files
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [listings, setListings] = useState([]); // Local state for listings
  const [gemOrigin, setGemOrigin] = useState(null);
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

  // Add image upload handler (append to existing images, up to 5)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const combined = [...prev, ...files].slice(0, 5);
      return combined;
    });
  };

  // Upload images to S3 and return their keys
  const uploadImagesToS3 = async () => {
    setUploading(true);
    setUploadError("");
    try {
      const uploadResults = await Promise.all(
        images.map(async (file) => {
          // Convert File to Blob if needed (for browser compatibility)
          let uploadFile = file;
          if (!(file instanceof Blob)) {
            uploadFile = new Blob([file], { type: file.type });
          }
          const filename = `${Date.now()}-${file.name}`;
          const result = await Storage.put(filename, uploadFile, {
            contentType: file.type,
            level: "public",
          });
          // Return a full S3 URL for preview/download
          return await Storage.get(result.key, { level: "public" });
        })
      );
      setUploading(false);
      return uploadResults;
    } catch (err) {
      setUploadError("Failed to upload images. Please try again.");
      setUploading(false);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError("");
    let uploadedImageUrls = [];
    try {
      // 1. Upload images to S3
      if (images.length > 0) {
        uploadedImageUrls = await Promise.all(
          images.map(async (file) => {
            let uploadFile = file;
            if (!(file instanceof Blob)) {
              uploadFile = new Blob([file], { type: file.type });
            }
            const filename = `${Date.now()}-${file.name}`;
            const result = await Storage.put(filename, uploadFile, {
              contentType: file.type,
              level: "public",
            });
            return await Storage.get(result.key, { level: "public" });
          })
        );
      }
      // 2. Get current user
      const currentUser = await Auth.currentAuthenticatedUser();
      const ownerId = currentUser.username || currentUser.attributes?.sub;
      // 3. Build input for GraphQL mutation
      const listingDetails = {
        owner: ownerId,
        gemType,
        colorCategory,
        fancyColor: gemType === "Diamond" && colorCategory === "fancy" ? fancyColor : "",
        intensity: gemType === "Diamond" && colorCategory === "fancy" ? intensity : "",
        selectedShapes,
        carat: parseFloat(carat),
        price: parseFloat(price),
        clarity,
        cutGrade,
        polish,
        symmetry,
        tablePct: tablePct ? parseFloat(tablePct) : null,
        depthPct: depthPct ? parseFloat(depthPct) : null,
        dimensionLength: dimensionLength ? parseFloat(dimensionLength) : null,
        dimensionWidth: dimensionWidth ? parseFloat(dimensionWidth) : null,
        dimensionDepth: dimensionDepth ? parseFloat(dimensionDepth) : null,
        dimensionTolerance: dimensionTolerance ? parseFloat(dimensionTolerance) : null,
        ratio: ratio ? parseFloat(ratio) : null,
        labs,
        enhancements,
        comments,
        contact: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
        },
        imageUrls: uploadedImageUrls,
        status: "PENDING_PAYMENT",
        gemOrigin: gemOrigin ? { code: gemOrigin.code, name: gemOrigin.name, flag: gemOrigin.flag } : null,
      };
      // 4. Call GraphQL mutation
      const result = await API.graphql(graphqlOperation(createListingMutation, { input: listingDetails }));
      const createdListing = result.data.createListing;
      setListings((prev) => [
        ...prev,
        { ...listingDetails, id: createdListing.id, createdAt: new Date().toISOString() },
      ]);
      // 5. Reset form
      setGemType("Diamond");
      setColorCategory("white");
      setFancyColor("");
      setIntensity("");
      setSelectedShapes([]);
      setCarat(1.0);
      setPrice(5000);
      setClarity("");
      setCutGrade("");
      setPolish("");
      setSymmetry("");
      setTablePct(57);
      setDepthPct(62);
      setDimensionLength("");
      setDimensionWidth("");
      setDimensionDepth("");
      setDimensionTolerance("");
      setRatio(1.0);
      setLabs([]);
      setEnhancements([]);
      setComments("");
      setContact({ firstName: "", lastName: "", phone: "", email: "" });
      setImages([]);
      setGemOrigin(null);
      // 6. Navigate to payment page
      navigate("/payment", { state: { listingId: createdListing.id, amount: parseFloat(price), name: gemType } });
    } catch (err) {
      console.error("Error creating listing:", err);
      setUploadError(err.message || "Failed to create listing. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a Gemstone Listing</h1>

        {/* Gem Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="gemType" className="block text-lg font-semibold text-gray-700 mb-2">Gem Type</label>
          <select
            id="gemType"
            value={gemType}
            onChange={e => setGemType(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="Diamond">Diamond</option>
            <option value="Sapphire">Sapphire</option>
            <option value="Ruby">Ruby</option>
            <option value="Emerald">Emerald</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Color Category Buttons */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Color Category</label>
          <div className="flex gap-2">
            {colorCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setColorCategory(category.value)}
                className={`px-4 py-2 rounded-lg border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${colorCategory === category.value ? category.accent : "bg-white border-gray-200 text-gray-700"}`}
                aria-label={category.label}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fancy Color Grid (only for Diamond + Fancy) */}
        {gemType === "Diamond" && colorCategory === "fancy" && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Color</label>
            <div className="grid grid-cols-5 gap-2">
              {/*
                Color options for fancy colored diamonds
                Each button represents a color, updates fancyColor state on click
              */}
              <button
                onClick={() => setFancyColor("Pink")}
                className={`px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${fancyColor === "Pink" ? "bg-pink-100 text-pink-900 border-pink-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label="Pink"
              >
                Pink
              </button>
              <button
                onClick={() => setFancyColor("Blue")}
                className={`px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${fancyColor === "Blue" ? "bg-blue-100 text-blue-900 border-blue-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label="Blue"
              >
                Blue
              </button>
              <button
                onClick={() => setFancyColor("Yellow")}
                className={`px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${fancyColor === "Yellow" ? "bg-yellow-100 text-yellow-900 border-yellow-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label="Yellow"
              >
                Yellow
              </button>
              <button
                onClick={() => setFancyColor("Green")}
                className={`px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${fancyColor === "Green" ? "bg-green-100 text-green-900 border-green-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label="Green"
              >
                Green
              </button>
              <button
                onClick={() => setFancyColor("Purple")}
                className={`px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${fancyColor === "Purple" ? "bg-purple-100 text-purple-900 border-purple-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label="Purple"
              >
                Purple
              </button>
              {/* Add more colors as needed */}
            </div>
          </div>
        )}

        {/* Shape Picker (multi-select) */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Shape</label>
          <ShapePicker
            selectedShapes={selectedShapes}
            onSelect={setSelectedShapes}
            multi={true}
          />
        </div>

        {/* Carat, Price, and Ratio Inputs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="carat" className="block text-lg font-semibold text-gray-700 mb-2">Carat</label>
            <input
              id="carat"
              type="number"
              step="0.01"
              min="0.01"
              value={carat}
              onChange={e => setCarat(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-lg font-semibold text-gray-700 mb-2">Price ($)</label>
            <input
              id="price"
              type="number"
              step="10"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="ratio" className="block text-lg font-semibold text-gray-700 mb-2">Ratio</label>
            <input
              id="ratio"
              type="number"
              step="0.01"
              min="0.01"
              value={ratio}
              onChange={e => setRatio(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Table % and Depth % Inputs (conditional rendering based on gemType) */}
        {(gemType === "Diamond" || gemType === "Other") && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="tablePct" className="block text-lg font-semibold text-gray-700 mb-2">Table %</label>
              <input
                id="tablePct"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={tablePct}
                onChange={e => setTablePct(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="depthPct" className="block text-lg font-semibold text-gray-700 mb-2">Depth %</label>
              <input
                id="depthPct"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={depthPct}
                onChange={e => setDepthPct(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        )}

        {/* Dimension Inputs (conditional rendering based on selectedShapes) */}
        {(selectedShapes.includes("Emerald") || selectedShapes.includes("Asscher") || selectedShapes.includes("Radiant")) && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="dimensionLength" className="block text-lg font-semibold text-gray-700 mb-2">Length (mm)</label>
              <input
                id="dimensionLength"
                type="number"
                step="0.01"
                min="0"
                value={dimensionLength}
                onChange={e => setDimensionLength(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="dimensionWidth" className="block text-lg font-semibold text-gray-700 mb-2">Width (mm)</label>
              <input
                id="dimensionWidth"
                type="number"
                step="0.01"
                min="0"
                value={dimensionWidth}
                onChange={e => setDimensionWidth(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="dimensionDepth" className="block text-lg font-semibold text-gray-700 mb-2">Depth (mm)</label>
              <input
                id="dimensionDepth"
                type="number"
                step="0.01"
                min="0"
                value={dimensionDepth}
                onChange={e => setDimensionDepth(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        )}

        {/* Labs and Enhancements (multi-select chips) */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Labs</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {certifications.map((cert) => (
              <button
                key={cert}
                onClick={() => handleCertChange(cert)}
                className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${labs.includes(cert) ? "bg-yellow-100 text-yellow-900 border-yellow-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label={cert}
              >
                {cert}
              </button>
            ))}
          </div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Enhancements</label>
          <div className="flex flex-wrap gap-2">
            {enhancements.map((enh) => (
              <button
                key={enh}
                onClick={() => handleEnhanceChange(enh)}
                className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${enhancements.includes(enh) ? "bg-yellow-100 text-yellow-900 border-yellow-400" : "bg-white border-gray-200 text-gray-700"}`}
                aria-label={enh}
              >
                {enh}
              </button>
            ))}
          </div>
        </div>

        {/* Comments and Contact Info */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Comments</label>
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            rows="3"
            placeholder="Any additional information about the listing..."
          ></textarea>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Contact Information</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={contact.firstName}
              onChange={e => setContact({ ...contact, firstName: e.target.value })}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="First Name"
            />
            <input
              type="text"
              value={contact.lastName}
              onChange={e => setContact({ ...contact, lastName: e.target.value })}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Last Name"
            />
            <input
              type="tel"
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value })}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Phone Number"
            />
            <input
              type="email"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email Address"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Images</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gemstone Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-all"
                  aria-label="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              multiple
            />
            <FaGem className="w-5 h-5 mr-2" />
            Upload Images (JPG, PNG, up to 5 files)
          </label>
          {uploadError && <p className="mt-2 text-sm text-red-500">{uploadError}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className={`px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-center gap-2 ${uploading ? "bg-yellow-300 text-yellow-900 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4zm16 0a8 8 0 01-8 8v-8h8z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              "Submit Listing"
            )}
          </button>
        </div>

        {/* Listings Table (for logged-in users) */}
        {listings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Listings</h2>
            <ListingTable listings={listings} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateListing;