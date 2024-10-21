'use client';

import React, { useState, ReactNode } from 'react';
import { Dropdown } from 'primereact/dropdown';
import TextInput from './input-options/TextInput';
import ApiInput from './input-options/ApiInput';
import FileInput from './input-options/FileInput';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { useData } from '@/app/hooks/useData';

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
    <div
      className={`px-2 bg-stone-50 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      <nav className="flex flex-col">
        <div className={`flex items-center mb-1 ${!expanded && 'mt-2'}`}>
          {expanded && <h2 className="text-xl font-bold">Load IPS</h2>}
          <Button
            className="ml-auto"
            severity="secondary"
            rounded
            text
            onClick={onExpandClick}
          >
            {expanded ? (
              <Image
                src={`${process.env.IMAGE_PATH}/icons/chevron_left.svg`}
                alt={'Chevron left'}
                width={20}
                height={20}
              />
            ) : (
              <Image
                src={`${process.env.IMAGE_PATH}/icons/chevron_right.svg`}
                alt={'Chevron right'}
                width={20}
                height={20}
              />
            )}
          </Button>
        </div>

        {expanded && (
          <>
            <Dropdown
              className="w-full"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.value)}
              options={options}
              placeholder={'Select an option'}
            />
            <div className="flex flex-col gap-2 mt-2">
              {componentMap[selectedOption]}
            </div>
          </>
        )}

        {expanded && <h2 className="text-xl font-bold">Sections</h2>}

        <div className="flex flex-col gap-1">
          {Array.isArray(children)
            ? children.map((child, index) => <div key={index}>{child}</div>)
            : children}
        </div>

        {expanded && (
          <div className="flex justify-center my-3">
            <a
              className="flex items-center gap-1 text-sm hover:text-blue-700 hover:underline"
              href="https://github.com/maxi-smidt/vips"
            >
              Find us on{' '}
              <Image
                src={`${process.env.IMAGE_PATH}/icons/github.svg`}
                alt={'GitHub Logo'}
                width={15}
                height={15}
              />
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
