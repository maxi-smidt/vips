interface SidebarFooterProps {
    expanded: boolean;
  }
  
  export default function SidebarFooter({ expanded }: SidebarFooterProps) {
    return (
      <div className="border-t flex items-center h-16 p-3">
        <div
          className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          <div className="leading-4">
            <h4 className="font-semibold whitespace-nowrap">Visualizer</h4>
            <span className="text-xs text-gray-600 whitespace-nowrap">International Patient Summary</span>
          </div>
        </div>
      </div>
    );
  }
  