import React, { ReactNode, Dispatch } from 'react';
import { ChevronLast, ChevronFirst } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface SidebarProps {
  children: ReactNode;
  expanded: boolean;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  children,
  expanded,
  setExpanded,
}: SidebarProps) {
  const onExpandClick = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem('expanded', newState.toString());
  };

  return (
    <>
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-stone-50 border-r shadow-sm transition-all duration-300 ${
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
              <div className="my-2">
                <label className="block font-medium">Method:</label>
                <select className="block w-full border rounded px-2 py-1 mt-1">
                  <option value="API">API</option>
                  <option value="Text">Text</option>
                  <option value="File">File</option>
                </select>
              </div>
              <div className="my-2">
                <textarea
                  className="block w-full h-32 border rounded px-2 py-1"
                  placeholder="Enter IPS data here..."
                ></textarea>
              </div>
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
    </>
  );
}
