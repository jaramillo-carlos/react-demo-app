import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<ProgressBar/>, div);
  ReactDOM.render(<ProgressBar percentage={30} />, div);
  ReactDOM.unmountComponentAtNode(div);
})