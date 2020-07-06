import React from 'react';
import './App.css';
import InLineProgressBar from './inLineProgressBar';
import CssProgressBar from './CssProgressBar';
import StyledProgressBar from './StyledProgressBar';
import ProgressBar from './ProgressBar';
import Movies from './Movies';
import Animations from './Animations';

function App() {
  return (
    <>
    <Animations />
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InLineProgressBar color="red" percentage={40} />
      <CssProgressBar color="green" percentage={60} />
      <StyledProgressBar color="blue" percentage={80} />
      <ProgressBar percentage={30} />
      <Movies />
    </div>
    </>
  );
}

export default App;
