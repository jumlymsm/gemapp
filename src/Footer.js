import React from 'react';

const Footer = () => (
  <footer className="w-full py-4 bg-gray-800 text-white text-center">
    <nav className="flex justify-center gap-6">
      <a href="/about" className="text-sm hover:underline">About Us</a>
      <a href="/contact" className="text-sm hover:underline">Contact Us</a>
    </nav>
    <p className="text-xs mt-2">&copy; 2025 GemNest. All rights reserved.</p>
  </footer>
);

export default Footer;
