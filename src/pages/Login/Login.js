import React from "react";
import axios from "axios";
import Logo from "../../assets/images/OKDKLogo.png";
import styled from "styled-components";

import BasicButton from "../../components/Button";

export default function Login() {
  const handleKakaoLogin = async () => {
    try {
      const api_key = process.env.REACT_APP_KAKAO_API_KEY; //REST API KEY
      const redirect_uri =
        "https://voluble-basbousa-74cfc0.netlify.app//kakao/callback/"; //Redirect URI
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${api_key}&redirect_uri=${redirect_uri}&response_type=code`;

      window.location.replace(kakaoURL);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const redirection_uri =
        "https://voluble-basbousa-74cfc0.netlify.app/google/callback/";

      const googleURL =
        "https://accounts.google.com/o/oauth2/auth?client_id=" +
        client_id +
        "&redirect_uri=" +
        redirection_uri +
        "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile" +
        "&response_type=token" +
        "&include_granted_scopes=true";

      window.location.replace(googleURL);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleNaverLogin = async () => {
    try {
      const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
      const response_type = "code";
      const uri = "https://voluble-basbousa-74cfc0.netlify.app/naver/callback/";
      const state = "false";
      // oauth 요청 URL

      const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${uri}&state=${state}'
       `;
      window.location.replace(naverURL);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <Body>
      <LogoContainer>
        <LoginLogo src={Logo} alt="로고" />
      </LogoContainer>
      <BasicButton
        btnName="카카오로 시작하기"
        onClick={() => handleKakaoLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#FBE300"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd"
      />
      <BasicButton
        btnName="네이버로 시작하기"
        onClick={() => handleNaverLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#00C300"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://user-images.githubusercontent.com/91887888/145205204-8041d35b-ee54-48f9-9c0d-32a5e01d2ac7.png"
      />
      <BasicButton
        btnName="구글로 시작하기"
        onClick={() => handleGoogleLogin()}
        width="16.8rem"
        height="3rem"
        backgroundColor="#FFF"
        borderRadius="1.875rem"
        fontSize="1rem"
        color="black"
        fontFamily="Pretendard"
        fontWeight="bold"
        imguri="https://freesvg.org/img/1534129544.png"
      />
    </Body>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
`;

export const Body = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

const LoginLogo = styled.img`
  width: 11.4375rem;
  height: 5.875rem;
`;
