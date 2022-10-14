import { createGlobalStyle } from 'styled-components';
import Styled from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}
  .page {
  width: 85%;
  border: 1px solid red;
  margin-left: auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const Arrticle = Styled.div`
  border: 1px solid pink;
`;

export default GlobalStyle;
