import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import LoginPage from "./LoginPage";
import CreateListing from "./CreateListing";
import Header from "./Header";
import Footer from "./Footer";
import Listing from "./Listing";
import Payment from "./payment";
import AdminDashboard from "./admin";
import Login2 from "./Login2";
import Signup2 from "./Signup2";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;