import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Wheel } from './wheel';
import { Spinner, SpinnerWithButton } from './spinner';

const entries = [
  { label: '1', weight: 2 },
  { label: '2', weight: 1 },
  { label: '3', weight: 1 }
];

ReactDOM.render(
  <SpinnerWithButton entries={entries} />,
  document.getElementById('root')
);
