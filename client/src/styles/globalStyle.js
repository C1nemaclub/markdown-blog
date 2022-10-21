import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`

*{
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}
body{
  overflow-x: hidden
}
html{
  font-size: 100%;
}


.arrow-left{
        font-size: 2rem;
        cursor: pointer;
        transition: .1s ease-in-out;
        color: black;
        &:hover{
          transform: scale(1.2)
        }
      }

  .page {
  width: 85%;
  margin-left: auto;
  padding: 1rem;
  min-height: 100vh;
  height: 100%;
}
.view-article-page{
  display: flex;
  margin-right: 1.5rem;
  justify-content: space-around;
  margin-top: 2rem;
}
@media screen and (max-width: 1000px) {
  html{
    font-size: 90%;
  }
}
@media screen and (max-width: 1200px){
  .page{
    width: 80%;
  }
  .view-article-page{
    gap: 1.2rem;
    align-items: flex-start;
    flex-direction: column;
    .recent-articles-container{
      align-self: flex-start;
    }
  }
}


`;

export default GlobalStyle;
