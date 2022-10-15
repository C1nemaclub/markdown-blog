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
  .admin-password{
  position: absolute;
  width: 100%;
  background: black;
  height: 100%;
  min-height: 100vh;
  z-index: 1000;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    input{
      font-size: 1.2rem;
      padding: .4rem 1rem;
      border-radius: 20px;
    }
  }
}
  
}
`;

export const Arrticle = Styled.div`
  border: 1px solid pink;
`;

export default GlobalStyle;
