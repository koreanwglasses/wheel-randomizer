import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Wheel } from './wheel';
import { Spinner, SpinnerWithButton } from './spinner';

const entries = [
  { label: 'Halal Shack', weight: 2 },
  { label: 'TMC', weight: 1 },
  { label: 'Panera', weight: 1 },
  { label: 'Sage', weight: 2 },
  { label: 'Commons', weight: 4 },
  { label: 'Moes', weight: 1 }
];

ReactDOM.render(
  <SpinnerWithButton entries={entries} />,
  document.getElementById('root')
);
