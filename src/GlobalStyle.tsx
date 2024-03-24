import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: Pretendard;
    font-weight: 500;
    letter-spacing: 0.05em;
    user-select:none;
  }
`;

export default GlobalStyle;
