import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  }

  @media (max-width: 768px) {
    body {
      padding: 20px;
    }
    .container {
      width: 100%;
      max-width: 100%;
    }
  }
`;
