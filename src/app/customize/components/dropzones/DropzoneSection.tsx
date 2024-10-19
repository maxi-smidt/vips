import { ConfigSection, isConfigEntry } from '@/app/types/Config';
import React, { useState } from 'react';
import DropzoneEntry from '@/app/customize/components/dropzones/DropzoneEntry';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Droppable from '@/app/customize/components/dropzones/Droppable';
import { v4 as uuidv4 } from 'uuid';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';

interface DropzoneSectionProps {
  section: ConfigSection;
  resourceKey: string;
  path: number[];
}

export default function DropzoneSection({
  section,
  resourceKey,
  path,
}: DropzoneSectionProps) {
  const [visible, setVisible] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const { insertSection, deleteComponent } = useCustomConfig();

  const setInvisible = () => {
    setVisible(false);
    setSectionTitle('');
  };

  const footerContent = (
    <Button
      label="Ok"
      icon="pi pi-check"
      disabled={!sectionTitle}
      onClick={() => {
        insertSection(resourceKey, path, sectionTitle);
        setInvisible();
      }}
      autoFocus
    />
  );

  return (
    <div
      key={`section-${section.display}`}
      className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]"
    >
      <div className="bg-blue-300 col-start-1 row-start-1 row-end-4 w-8 flex items-center justify-center rounded-l-lg"></div>

      <div className="bg-blue-300 col-start-2 row-start-1 h-8 flex items-center justify-center rounded-tr-lg">
        <h4 className="text-white">{section.display}</h4>
        <div className="ms-auto">
          {path.length > 0 && (
            <Button
              icon="pi pi-times"
              rounded
              text
              severity="danger"
              onClick={() => deleteComponent(resourceKey, path)}
            />
          )}
          <Button
            icon="pi pi-plus"
            rounded
            text
            severity="success"
            onClick={() => setVisible(true)}
          />
          <Dialog
            visible={visible}
            modal
            header={
              <span className="font-bold white-space-nowrap">
                Section Title
              </span>
            }
            footer={footerContent}
            onHide={() => {
              setInvisible();
            }}
          >
            <InputText
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
          </Dialog>
        </div>
      </div>

      <div className="col-start-2 row-start-2 flex gap-4 py-1">
        <div className="flex flex-col w-full gap-1 ml-1">
          <Droppable id={uuidv4()} path={[...path, 0]} />
          {section.components.map((component, index) => (
            <div key={`component-${section.display}-${index}`}>
              {isConfigEntry(component) ? (
                <DropzoneEntry
                  configEntry={component}
                  resourceKey={resourceKey}
                  path={[...path, index]}
                />
              ) : (
                <DropzoneSection
                  section={component}
                  resourceKey={resourceKey}
                  path={[...path, index]}
                />
              )}
              <Droppable id={uuidv4()} path={[...path, index + 1]} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-300 col-start-2 row-start-3 h-8 flex items-center justify-center rounded-br-lg"></div>
    </div>
  );
}
