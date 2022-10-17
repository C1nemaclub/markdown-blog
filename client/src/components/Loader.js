import React from 'react';
import Styled from 'styled-components';

export default function Loader() {
  return <Spinner></Spinner>;
}

const Spinner = Styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid dodgerblue;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation .5s linear infinite;
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

    `;
