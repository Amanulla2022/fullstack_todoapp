import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mt-2 mx-20">
          <div className="mb-4 md:mb-0 flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              To<span className="text-blue-600">Do</span>
            </h1>
            <p className="text-sm">
              @ <span className="text-blue-600">2024</span> ToDo App. All rights
              reserved.
            </p>
            <span>
              By <span className="text-blue-600">Amanulla</span>
            </span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/amanulla-mulla-000678232/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin className="text-5xl rounded-full p-2" />
            </a>
            <a
              href="https://github.com/Amanulla2022"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaGithub className="text-5xl rounded-full p-2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
