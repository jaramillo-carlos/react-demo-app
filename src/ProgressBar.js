import React from 'react';
import PropTypes from 'prop-types'
import StyledProgressBar from './StyledProgressBar';

function ProgressBar(props) {
  return <StyledProgressBar color={ props.color } percentage={ props.percentage } />
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  percentage: PropTypes.number.isRequired
}

ProgressBar.defaultProps = {
  color: 'gray'
}

export default ProgressBar;