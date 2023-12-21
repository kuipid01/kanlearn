import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 w-full  bottom-0 left-0 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kanlearn. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
