import { createGlobalStyle } from 'styled-components';
import Styled from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}
body{
  overflow-x: hidden
}

  .page {
  width: 85%;
  margin-left: auto;
  padding: 1rem;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  .admin-password{

  //z-index: 1000;
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
.view-article-page{
  display: flex;
  margin-right: 1.5rem;
  justify-content: space-around;
  margin-top: 2rem;
}
.admin-page{
    border: 1px solid red;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    position: absolute;
    background: red;
    left: 0;
    top: 0;
  }
`;

export default GlobalStyle;
