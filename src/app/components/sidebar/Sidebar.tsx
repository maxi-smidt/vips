'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronLast, ChevronFirst } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';
import TextInput from './input-options/TextInput';
import ApiInput from './input-options/ApiInput';
import FileInput from './input-options/FileInput';
import { useData } from '@/app/components/DataContext';

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const options = ['File', 'API', 'Text'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { expanded, setExpanded } = useData();
  const onExpandClick = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem('expanded', newState.toString());
  };

  const componentMap = {
    [options[0]]: <FileInput />,
    [options[1]]: <ApiInput />,
    [options[2]]: <TextInput />,
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-stone-50 border-r shadow-lg transition-all duration-150 overflow-hidden ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 flex items-center h-16">
          <button
            onClick={onExpandClick}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {expanded && (
          <div className="px-4 pb-2">
            <h2 className="text-xl font-bold">Load IPS</h2>
            <div className="mt-2 mb-4">
              <label className="block font-medium">Method:</label>
              <Dropdown
                className="w-full"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.value)}
                options={options}
                placeholder={'Select an option'}
              />
            </div>
            <div className="my-2">{componentMap[selectedOption]}</div>
            <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded">
              Load IPS
            </button>
          </div>
        )}

        {expanded && (
          <div className="px-4">
            <h2 className="text-xl font-bold">Sections</h2>
          </div>
        )}

        <ul className={`px-3 space-y-1`}>{children}</ul>

        {expanded && (
          <div className="absolute bottom-2 left-2">
            <a
              className="flex items-center gap-1 text-sm hover:text-blue-700 hover:underline"
              href="https://github.com/maxi-smidt/vips"
            >
              Find us on <FaGithub />
            </a>
          </div>
        )}
      </nav>
    </aside>
  );
}
