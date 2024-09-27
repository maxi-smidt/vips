import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaRegFilePdf } from 'react-icons/fa6';

export default function Header() {
  return (
    <header className="bg-stone-100">
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
        <div className="flex items-center mr-3 gap-3">
          <div>
            <div className="relative">
              <input
                type="search"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search keywords..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2 h-full text-white bg-slate-500 rounded-e-lg border border-slate-500 hover:bg-slate-600"
              >
                <IoIosSearch className="text-xl" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="p-2 text-slate-500 rounded-lg hover:bg-stone-200"
          >
            <FaRegFilePdf className="text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
