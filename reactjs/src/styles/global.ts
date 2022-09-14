import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --max-width-content: 1200px;
    --white: #fff;
    --roxo: rgba(162, 155, 254, .1);

    --footer-height: 1340px;

    @media (min-width: 734px) {
      --footer-height: 560px;
    }
  }
  
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    outline: 0;
    letter-spacing: 1px;
    font-size: 1em;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  h1 {

    font-size: 2em;

  }

  h2 {

    font-size: 1.8em;

  }

  h3 {

    font-size: 1.6em;

  }

  img {

    max-width: 100%;

  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  .text-link {
    color: #3498db;
    cursor: pointer;

    :hover {
      color: #1C4E80;
    }
  }

  body, html, #root {
    height: 100%;
    min-height: 100%;
    color: #000;
  }

  .App{
    position: relative;
    min-height: 100%;
  }

  .App {
    min-height: 100%;
  }

  .App::after {
    content: "";
    clear: both;
    display: table;
  }
  
  /* ESTRUTURA */
  .container {
    width: 100%;
    float: left;
    padding: 40px 0;
  }

  .content {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width-content);
  }

  .clear {
    clear: both;
  }

  .font-zero {

    display: none;
    font-size: 0em;

  }

  .bg-black {
    background-color: #111111;
    color: #fff;
  }

  .bg-white {
    background-color: #fff;
    color: #666;
  }
  
  .bg-white-2 {
    background-color: #FBFBFB;
    color: #666;
  }

  .bg-white-3 {
    background-color: #eee;
    color: #666;
  }
  
  .bg-orange {
    background-color: #F09F23;
    color: #fff;
  }
  
  .text-bold {
    font-weight: bold;
  }
  
  .padding-content-20 {
    padding: 20px 0 !important;
  }
  
  .flex-1{
    flex: 1;
  }
  
  .pointer {
    cursor: pointer;
  }
`;
