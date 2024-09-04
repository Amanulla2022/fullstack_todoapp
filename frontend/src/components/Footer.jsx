import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mt-2 mx-20">
          <div className="mb-4 md:mb-0 md:text-left">
            <h1 className="text-3xl font-bold">
              To<span className="footer-span">Do</span>
            </h1>
            <p className="text-sm">
              @Amanulla <span className="footer-span">2024</span> ToDo App. All
              rights reserved.
            </p>
            <span>
              +91 <span className="footer-span">9590397339</span>
            </span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/amanulla-mulla-000678232/"
              target="_blank"
              rel="noreferrer"
              className="footer-link hover:bg-blue-600"
            >
              <FaLinkedin className="footer-icons" />
            </a>
            <a
              href="https://github.com/Amanulla2022"
              target="_blank"
              rel="noreferrer"
              className="footer-link hover:bg-black"
            >
              <FaGithub className="footer-icons" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
