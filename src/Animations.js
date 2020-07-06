import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import logoSvg from './logo.svg';
import logoSvg2 from './svg-file.svg';
import cheet from 'cheet.js'

cheet('x d', () => {
 alert('xd');
})

const Animations = () => {
  const [showReact, setShowReact] = useState(logoSvg);
  const logo = showReact ? logoSvg : logoSvg2;
  return (
    <>
    <button onClick={() => setShowReact(!showReact)}>Click me</button>
    <TransitionGroup>
      <CSSTransition
        key={logo}
        timeout={{
          appear: 5000,
          enter: 5000,
          exit: 1000,
        }}
        exit={false}
        /*
        classNames={{
          appear: 'my-appear',
          appearActive: 'my-active-appear',
          appearDone: 'my-done-appear',
          enter: 'my-enter',
          enterActive: 'my-active-enter',
          enterDone: 'my-done-enter',
          exit: 'my-exit',
          exitActive: 'my-active-exit',
          exitDone: 'my-done-exit',
         }}
         */
        classNames="fade">
        <img
          key={showReact}
          src={logo}
          className="App-logo"
          alt="logo"
        />
      </CSSTransition>
    </TransitionGroup>
    </>
  )
}

export default Animations;