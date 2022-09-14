import styled from 'styled-components';

export const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  list-style: none;
  
  a {
    margin-right: 30px;
    
    &:hover {
      font-weight: bold;
    }
  }
`;