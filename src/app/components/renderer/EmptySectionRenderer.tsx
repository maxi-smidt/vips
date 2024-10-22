import React from 'react';

const EmptySectionRenderer: React.FC = () => {
  return (
    <div className="p-2 flex justify-center">
      <p>No entries available for this section.</p>
    </div>
  );
};

export default EmptySectionRenderer;
