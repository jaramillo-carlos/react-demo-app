import React from 'react';
import './CssProgressBar.css';

function CssProgressBar(props) {
  return (
    <div className="ProgressBar" style={{ boderColor: props.color, backgroundImage: `linear-gradient(90deg, ${props.color} 0%, ${props.color} ${props.percentage}%, #fefefe ${props.percentage}%, #fefefefe 100%)` }}></div>
  )
}
export default CssProgressBar;