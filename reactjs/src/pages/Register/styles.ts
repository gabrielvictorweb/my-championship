import styled from 'styled-components';

export const Form = styled.form`
  .ds-flex {
    display: flex;
    align-items: flex-end;
    
    button {
      margin-left: 20px;
    }
  }
  
  button {
    padding: 10px !important;
    margin-bottom: 20px;
    width: auto;
  }
  
  .list  {
    width: 100%;
    max-width: 300px;
    height: 400px;
    background-color: #eee;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 0.9em;
    list-style-position: inside;
    
    li {
      margin-top: 10px;
    }
  }
`;