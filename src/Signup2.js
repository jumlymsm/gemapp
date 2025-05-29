import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";

const countryOptions = [
  "New Zealand", "Australia", "United States", "United Kingdom", "India", "Singapore"
  // ... add more countries as needed
];

export default function Signup2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(countryOptions[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          "custom:city": city,
          "custom:country": country
        }
      });
      setConfirmationSent(true);
    } catch (err) {
      setError(err.message || "Sign up failed.");
    }
    setLoading(false);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      navigate("/login2");
    } catch (err) {
      setError(err.message || "Confirmation failed.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {!confirmationSent ? (
        <form onSubmit={handleSignUp}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%" }} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%" }} />
          </div>
          <div>
            <label>City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} required style={{ width: "100%" }} />
          </div>
          <div>
            <label>Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)} required style={{ width: "100%" }}>
              {countryOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", marginTop: 16 }}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div style={{ marginTop: 12, textAlign: "center" }}>
            Already have an account? <Link to="/login2">Login</Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirm}>
          <div>
            <label>Confirmation Code</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required style={{ width: "100%" }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", marginTop: 16 }}>
            {loading ? "Confirming..." : "Confirm Account"}
          </button>
        </form>
      )}
    </div>
  );
}
