import React, { useState } from "react";
import { Auth } from "aws-amplify";

const countryOptions = [
  "New Zealand", "Australia", "United States", "United Kingdom", "India", "Singapore"
  // ... add more countries as needed
];

export default function SignUp({ onRequireConfirm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(countryOptions[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          "custom:city": city,
          "custom:country": country
        }
      });
      // If confirmation is required, trigger parent callback
      if (onRequireConfirm) onRequireConfirm(email);
    } catch (err) {
      // Show clear error message
      setError(err.message || (err && err.errors && err.errors[0] && err.errors[0].message) || "Sign up failed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignUp} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Create an account</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>City</label>
        <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
      </div>
      <div>
        <label>Country</label>
        <select value={country} onChange={e => setCountry(e.target.value)} required>
          {countryOptions.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
    </form>
  );
}
