import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default Container;
