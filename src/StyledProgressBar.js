import styled, { keyframes } from 'styled-components';

// sass properties like modifiers to colors, transparent and any
// can use da library polished from styled components too
const load = keyframes`
  from { background-size: 0 100%;}
  to { background-size: 100% 100%;}
`

const StyledProgressBar = styled.div`
  background-color: #fefefe;
  background-image: ${ props => `linear-gradient(90deg, ${ props.color } 0%, ${ props.color} ${ props.percentage }%, #fefefe ${ props.percentage }%, #fefefe 100%)`};
  background-size: 100%;
  background-repeat: no-repeat;
  border: .125em solid ${ props => props.color };
  border-radius: 2em;
  width: 100%;
  max-width: 36em;
  box-sizing: border-box;
  min-height: 2em;
  padding: .5em;
  margin: 2em auto;
  animation: ${load} 2s ease;
`

export default StyledProgressBar;