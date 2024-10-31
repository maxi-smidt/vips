'use client';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { ButtonGroup } from 'primereact/buttongroup';
import { useToast } from '@/app/hooks/useToast';
import { useData } from '@/app/hooks/useData';

export default function SearchBar() {
  const { showError } = useToast();
  const { setActiveTabs } = useData();
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<Element[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  return (
    <div className="relative flex">
      <InputText
        placeholder="Search... (beta unstable)"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        icon="pi pi-search"
        className="search-button"
        severity="secondary"
        onClick={() => search(searchText)}
      />
      <div className="flex items-center ml-1">
        <ButtonGroup>
          <Button
            icon="pi pi-angle-left"
            severity="secondary"
            text
            disabled={currentIndex === null || currentIndex === 0}
            onClick={goToPreviousResult}
            size="small"
          />
          <Button
            icon="pi pi-angle-right"
            severity="secondary"
            text
            disabled={
              currentIndex === null || results.length - 1 === currentIndex
            }
            onClick={goToNextResult}
            size="small"
          />
        </ButtonGroup>
      </div>
    </div>
  );

  async function search(searchTerm: string) {
    if (!searchTerm) return;
    const targets: Element[] = [];
    const elements = document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, strong',
    );

    elements.forEach((el) => {
      if (el.textContent?.toLowerCase().includes(searchTerm.toLowerCase())) {
        targets.push(el);
      }
    });
    setResults(targets);
    if (targets.length > 0) {
      changeIndex(0);
      scrollToCurrentElement(0);
    } else {
      showError('No results found');
      setCurrentIndex(null);
    }
  }

  function goToNextResult() {
    if (currentIndex !== null && currentIndex < results.length - 1) {
      const newIndex = currentIndex + 1;
      changeIndex(newIndex);
      scrollToCurrentElement(newIndex);
    }
  }

  function goToPreviousResult() {
    if (currentIndex !== null && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      changeIndex(newIndex);
      scrollToCurrentElement(newIndex);
    }
  }

  function changeIndex(newIndex: number) {
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
  }

  function scrollToCurrentElement(index: number) {
    if (previousIndex !== null) {
      results[previousIndex].setAttribute(
        'style',
        'background-color: transparent;',
      );
    }

    const element = results[index];
    openTabIfClosed(element);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.setAttribute('style', 'background-color: yellow;');
    }
  }

  function openTabIfClosed(element: Element) {
    const tabIndex = getClosestTabIndex(element);

    if (tabIndex !== null) {
      setActiveTabs((prevState) => {
        return prevState.includes(tabIndex)
          ? prevState
          : [...prevState, tabIndex];
      });
    }
  }

  function getClosestTabIndex(element: Element): number | null {
    let parent = element.parentElement;

    while (parent) {
      if (parent.tagName === 'DIV' && parent.className.includes('tabIndex')) {
        const match = parent.className.match(/tabIndex=(\d+)/);
        return match ? parseInt(match[1], 10) : null;
      }
      parent = parent.parentElement;
    }

    return null;
  }
}
