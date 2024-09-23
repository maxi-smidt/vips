import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaRegFilePdf } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-gray-300 shadow">
      <div className="p-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img
            src="https://hapifhir.io/hapi-fhir/images/logos/raccoon-forwards.png"
            alt="HAPI FHIR Logo"
            className="w-12 h-12"
          />
          <span className="ml-4 text-2xl font-semibold text-gray-800">
            VIPS
          </span>
        </div>
        <div className="flex items-center mr-32">
          <button
            type="submit"
            className="mr-12 p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {/* TODO: style pdf icon button */}
            <FaRegFilePdf />
            <span className="sr-only">Search</span>
          </button>
          <div className="relative w-64">
            {' '}
            {/* TODO: Adjust margin right for search bar */}
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Search keywords..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {/* TODO: adjust search icon size */}
            {/* TODO: integrate search icon to text file? */}
            <IoIosSearch className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </header>
  );
}
