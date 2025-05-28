import React, { useState } from "react";
import { FaLock, FaCcVisa, FaCcMastercard, FaCcAmex, FaRegCreditCard, FaRegFileImage, FaRegFilePdf, FaCheckCircle, FaArrowLeft, FaEdit, FaCloudUploadAlt, FaGem } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const bankDetails = {
  accountName: "Gem Marketplace Ltd.",
  accountNumber: "1234567890",
  bankName: "Global Bank",
  swift: "GBLBNZ22",
  branch: "123 Queen St, Auckland, NZ"
};

function Payment() {
  const [method, setMethod] = useState("card");
  const [showBilling, setShowBilling] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [billing, setBilling] = useState({ address: "" });
  const [cardType, setCardType] = useState(null);
  const [cardError, setCardError] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const gem = location.state?.gem || { name: "Your Gem Listing", duration: "30 days", amount: 49.99 };

  // Card type detection (Visa, MC, Amex)
  const detectCardType = (number) => {
    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    return null;
  };

  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    setCard({ ...card, number: value });
    setCardType(detectCardType(value));
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      if (file.type.startsWith("image/")) {
        setProofPreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setProofPreview("pdf");
      } else {
        setProofPreview(null);
      }
    }
  };

  const removeProof = () => {
    setProofFile(null);
    setProofPreview(null);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment-success", { state: { gem } });
    }, 1800);
  };

  const handleProofSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment-success", { state: { gem } });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Indicator */}
      <div className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FaLock className="text-green-500 mr-1" />
          Step 2 of 2: Payment
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Listing
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full py-8 px-2 gap-8 grow">
        {/* Main Payment Card */}
        <div className="flex-1 flex justify-center items-start">
          <div className="w-full max-w-[380px] mx-auto">
            {/* Sliding Option Selector */}
            <div className="flex mb-8 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <button
                className={`flex-1 py-3 font-semibold transition-all duration-200 ${method === "card" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-200"}`}
                onClick={() => setMethod("card")}
                style={{ borderRadius: method === "card" ? '12px 0 0 12px' : '0' }}
              >
                Credit Card
              </button>
              <button
                className={`flex-1 py-3 font-semibold transition-all duration-200 ${method === "bank" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-200"}`}
                onClick={() => setMethod("bank")}
                style={{ borderRadius: method === "bank" ? '0 12px 12px 0' : '0' }}
              >
                Bank Transfer
              </button>
            </div>
            {/* Animated Form Switch */}
            <div className="relative min-h-[420px]">
              {/* Credit Card Form */}
              <form
                className={`absolute top-0 left-0 w-full transition-all duration-300 ${method === "card" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}
                onSubmit={handlePay}
                autoComplete="off"
              >
                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FaRegCreditCard className="text-blue-500 text-lg" />
                    <span className="font-semibold text-base">Pay by Credit Card</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <label className="text-xs font-medium self-start">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={card.name}
                      onChange={handleCardChange}
                      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-10/12 max-w-[220px]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <label className="text-xs font-medium flex items-center gap-2 self-start">
                      Card Number
                      {cardType === "visa" && <FaCcVisa className="text-blue-600 text-base" />}
                      {cardType === "mastercard" && <FaCcMastercard className="text-yellow-600 text-base" />}
                      {cardType === "amex" && <FaCcAmex className="text-green-600 text-base" />}
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={card.number}
                      onChange={handleCardNumber}
                      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest text-sm w-10/12 max-w-[220px]"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      inputMode="numeric"
                      required
                    />
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="flex-1 flex flex-col gap-1 items-center">
                      <label className="text-xs font-medium self-start">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="expiry"
                        value={card.expiry}
                        onChange={handleCardChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full max-w-[80px]"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 items-center">
                      <label className="text-xs font-medium self-start">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={card.cvv}
                        onChange={handleCardChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full max-w-[60px]"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  {/* Billing Address (collapsible) */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-1"
                      onClick={() => setShowBilling((v) => !v)}
                    >
                      {showBilling ? "Hide" : "Add"} Billing Address
                    </button>
                    {showBilling && (
                      <input
                        type="text"
                        name="address"
                        value={billing.address}
                        onChange={handleBillingChange}
                        className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-10/12 max-w-[220px] text-sm"
                        placeholder="Billing Address (optional)"
                      />
                    )}
                  </div>
                  {/* Accepted Cards Row */}
                  <div className="flex flex-row items-center justify-evenly gap-2 mt-1 mb-1">
                    <FaCcVisa className="text-blue-600 text-lg" />
                    <FaCcMastercard className="text-yellow-600 text-lg" />
                    <FaCcAmex className="text-green-600 text-lg" />
                  </div>
                  {/* Payment Summary */}
                  <div className="bg-blue-50 rounded-lg p-2 flex items-center gap-2 mt-1">
                    <FaCheckCircle className="text-green-500 text-base" />
                    <div>
                      <div className="font-semibold text-xs">Listing Fee: <span className="text-blue-700">US ${gem.amount.toFixed(2)}</span></div>
                      <div className="text-xs text-gray-500">For: {gem.name} ({gem.duration})</div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mx-auto w-3/4 max-w-[180px] bg-blue-600 text-white py-2 rounded-xl font-semibold text-sm mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2 transition-all shadow-md"
                    disabled={loading}
                  >
                    {loading ? <span className="loader mr-2"></span> : null}
                    Pay Now
                  </button>
                  {/* Spacer below button for footer separation */}
                  <div style={{ minHeight: '1.5rem' }} />
                </div>
              </form>
              {/* Bank Transfer Form */}
              <form
                className={`absolute top-0 left-0 w-full transition-all duration-300 ${method === "bank" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}
                onSubmit={handleProofSubmit}
                autoComplete="off"
              >
                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCloudUploadAlt className="text-green-500 text-lg" />
                    <span className="font-semibold text-base">Pay by Bank Transfer</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 mb-2">
                    <div className="font-semibold text-xs">Bank Account Details</div>
                    <div className="text-xs mt-1">
                      <div><span className="font-medium">Account Name:</span> <span className="select-all">{bankDetails.accountName}</span></div>
                      <div><span className="font-medium">Account Number:</span> <span className="select-all">{bankDetails.accountNumber}</span></div>
                      <div><span className="font-medium">Bank Name:</span> {bankDetails.bankName}</div>
                      <div><span className="font-medium">SWIFT/BIC:</span> {bankDetails.swift}</div>
                      <div><span className="font-medium">Branch:</span> {bankDetails.branch}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <label className="text-xs font-medium self-start">Upload Proof of Payment</label>
                    <div className="flex items-center gap-2 w-full justify-center">
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg p-2 cursor-pointer hover:bg-green-50 transition-all w-10/12 max-w-[180px]">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={handleProofUpload}
                        />
                        <FaCloudUploadAlt className="text-green-500 text-xl mb-1" />
                        <span className="text-xs text-gray-600">Drag & drop or click to upload</span>
                      </label>
                      {proofFile && (
                        <div className="relative">
                          {proofPreview === "pdf" ? (
                            <FaRegFilePdf className="text-red-500 text-lg" />
                          ) : (
                            <img src={proofPreview} alt="Proof" className="w-10 h-10 object-cover rounded-lg border" />
                          )}
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 text-xs text-gray-500 hover:text-red-600"
                            onClick={removeProof}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 self-start">Please upload proof of your bank transfer for verification.</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 flex items-center gap-2 mt-1">
                    <FaCheckCircle className="text-green-500 text-base" />
                    <div>
                      <div className="font-semibold text-xs">Listing Fee: <span className="text-green-700">US ${gem.amount.toFixed(2)}</span></div>
                      <div className="text-xs text-gray-500">For: {gem.name} ({gem.duration})</div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mx-auto w-3/4 max-w-[180px] bg-green-600 text-white py-2 rounded-xl font-semibold text-sm mt-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-md"
                    disabled={!proofFile || loading}
                  >
                    {loading ? <span className="loader mr-2"></span> : null}
                    Submit Proof
                  </button>
                  {/* Spacer below button for footer separation */}
                  <div style={{ minHeight: '1.5rem' }} />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Payment Summary Sidebar */}
        <div className="hidden md:block w-full max-w-[380px]">
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <FaGem className="text-yellow-500 text-2xl" />
              <span className="font-semibold text-lg">Listing Summary</span>
            </div>
            <div className="mb-2">
              <div className="text-gray-700 font-medium">{gem.name}</div>
              <div className="text-xs text-gray-500">Duration: {gem.duration}</div>
            </div>
            <div className="text-xl font-bold text-blue-700 mb-4">US ${gem.amount.toFixed(2)}</div>
            <button
              className="flex items-center gap-1 text-gray-500 hover:text-blue-700 text-xs mb-2"
              onClick={() => navigate(-1)}
            >
              <FaEdit /> Edit Listing Details
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <FaLock className="text-green-500" /> All payments are secured by SSL
            </div>
            <button
              className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 text-xs"
              onClick={() => navigate("/contact-support")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8 w-full shrink-0">
        &copy; 2025 GemNest. All rights reserved.
      </footer>
    </div>
  );
}

export default Payment;
