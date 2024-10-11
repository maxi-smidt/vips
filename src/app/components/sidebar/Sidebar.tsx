'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronLast, ChevronFirst } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';
import TextInput from './input-options/TextInput';
import ApiInput from './input-options/ApiInput';
import FileInput from './input-options/FileInput';
import { useData } from '@/app/components/provider/DataProvider';
import { Button } from 'primereact/button';

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
          <Button
            className="p-1.5 ml-auto"
            severity="secondary"
            rounded
            text
            onClick={onExpandClick}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
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
            <div className="flex flex-col gap-2 my-2">
              {componentMap[selectedOption]}
            </div>
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
