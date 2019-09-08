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
  //   <Spinner
  //     entries={entries}
  //     duration={5}
  //     target={2 * Math.PI * (3 * Math.random() + 7)}
  //   />,
  <SpinnerWithButton entries={entries} duration={5} />,
  document.getElementById('root')
);
