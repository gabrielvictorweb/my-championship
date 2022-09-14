import styled from 'styled-components';

interface ButtonProps {
    color?: 'primary' | 'secondary';
}

export const ButtonStyled = styled.button<ButtonProps>`
  background-color: ${props => props.color === 'primary' ? '#000' : '#fff'};
  color: ${props => props.color !== 'primary' ? '#000' : '#fff'};
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  padding: 20px;
  border-radius: 3px;
  width: 100%;
  border: 0;
  
  &:disabled {
   background-color: #ccc; 
  }
`;
