import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t p-4 bg-white shadow-sm text-left">
      <div className="flex flex-col w-full text-gray-700 space-y-2 min-h-20">
        <div className="text-left">
          <h4 className="font-semibold text-base text-gray-700">
            Created by:
            <span className="ml-2">
              Anja Schwab, Alexandra Denk, Marco Sarkady, Maximilian Smidt, Robin Berger, Selina Adlberger
            </span>
          </h4>
        </div>

        <div className="text-left">
          <span>Code repository: </span>
          <a
            href="https://github.com/maxi-smidt/vips"
            className="text-blue-600 hover:text-blue-800"
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className="text-left text-sm text-gray-600">
          License: MIT
        </div>
      </div>
    </footer>
  );
}
