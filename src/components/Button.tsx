import styled from 'styled-components';
export const StyledButton = styled.button`
  width: 200px;
  height: 40px;
  margin: 10px;
  background-color: #0089ff;

  border: 0;
  border-radius: 5px;
  outline: 0;

  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 2px;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #1e75de;
    scale: 105%;
  }
`;
