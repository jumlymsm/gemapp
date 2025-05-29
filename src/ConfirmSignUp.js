import React, { useState } from "react";
import { Auth } from "aws-amplify";

export default function ConfirmSignUp({ email }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle confirmation form submission
  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await Auth.confirmSignUp(email, code);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Confirmation failed.");
    }
  };

  return (
    <form onSubmit={handleConfirm} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Confirm Your Account</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success ? (
        <div style={{ color: "green" }}>Account confirmed! You can now log in.</div>
      ) : (
        <>
          <div>
            <label>Confirmation Code</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
          </div>
          <button type="submit">Confirm</button>
        </>
      )}
    </form>
  );
}
