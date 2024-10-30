import React from 'react';
import { renderToString } from 'react-dom/server';

export function isEmptyDiv(component: React.JSX.Element) {
  const rendered = renderToString(component);
  const emptyDivsRegex =
    /^(<div[^>]*>\s*(<div[^>]*>\s*<\/div>\s*)*<\/div>|\s*)$/;
  return emptyDivsRegex.test(rendered);
}
