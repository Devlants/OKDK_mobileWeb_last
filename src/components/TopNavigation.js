import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/OKDKLogo.png";
import ArrowBack from "../assets/images/arrowBack.svg";
import { useNavigate } from "react-router-dom";

export const WrapTopNavigation = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 3.75rem;
  padding: 0.5rem 0.25rem;
  position: relative;
  box-sizing: border-box;
`;

export const LogoImage = styled.img`
  height: 3rem;
`;

export const ArrowBackImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  left: 1rem;
`;

const navigateWebView = (destination) => {
  console.log(destination);
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ status: `${destination}` })
    );
  }
};

export default function TopNavigation({ navigation, destination }) {
  return (
    <WrapTopNavigation>
      <LogoImage src={Logo} onClick={() => navigateWebView(destination)} />
      <ArrowBackImage
        src={ArrowBack}
        onClick={() => {
          navigation(-1);
        }}
      />
    </WrapTopNavigation>
  );
}
