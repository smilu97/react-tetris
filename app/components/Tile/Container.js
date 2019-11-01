import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.size - 1}px;
  height: ${props => props.size - 1}px;
  border: 1px solid black;
  background-color: ${props => props.color};
`;

export default Container;
