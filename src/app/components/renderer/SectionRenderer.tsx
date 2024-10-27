import { ConfigSection } from '@/app/types/Config';
import React, {ReactNode} from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resource: Resource;
}

function hasTextNodeInReactNode(node: ReactNode): boolean {
  // If the node is a string or number, it is a text node
  if (typeof node === 'string' || typeof node === 'number') {
    return true;
  }

  // If the node is an array, check each item
  if (Array.isArray(node)) {
    return node.some(hasTextNodeInReactNode);
  }

  // If the node is a React element, check its children
  if (React.isValidElement(node)) {
    return hasTextNodeInReactNode(node.props.children);
  }

  // If the node is none of the above, return false
  return false;
}

export default function SectionRenderer({
  configSection,
  depth,
  resource,
}: SectionRendererProps) {
  const checkIfEmptyList = configSection.components.map((component) => (
    if(){

    }
  ));
  return (
    <div
      key={configSection.display}
      className={`p-2 bg-gray-${100 * depth} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
    >
      {configSection.display && <h3>{configSection.display}</h3>}
      {checkIfEmptyList}
    </div>
  );
}
