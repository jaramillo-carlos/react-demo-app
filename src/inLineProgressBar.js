import React from 'react';

function InLineProgressBar(props) {
  const styles = {
    backgroundColor: '#fefefe',
    backgroundImage: `linear-gradient(90deg, ${props.color} 0%, ${props.color} ${props.percentage}%, #fefefe ${props.percentage}%, #fefefe 100%)`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    border: `.125em solid ${props.color}`,
    borderRadius: '2em',
    width: '100%',
    maxWidth: '36em',
    boxSizing: 'border-box',
    minHeight: '2em',
    padding: '.5em',
    margin: '2em auto'
  }
  return (
    <div style={styles}>{props.children}</div>
  )
}

export default InLineProgressBar;