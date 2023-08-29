import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "../../assets/loading-spinner.gif";

import { authInstance } from "../../API/utils";

const KakaoLogin = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `http://3.36.95.105/account/kakao/callback/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        const accessToken = res.data["access"];
        const refreshToken = res.data["refresh"];

        //react-native에 메세지 전송
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              status: "success",
              access_token: accessToken,
              refresh_token: refreshToken,
            })
          );
        }

        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);

        navigate("/");
      } catch (error) {
        console.error("로그인 실패:", error);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ status: "failed" })
          );
        }
      }
    };

    kakaoLogin();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "35vh",
      }}
    >
      <div>
        <img
          style={{ width: "50px", height: "50px" }}
          src={LoadingSpinner}
          alt="Loading spinner"
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        카카오 로그인 중입니다. <br />
        조금만 기다려주세요!
      </div>
    </div>
  );
};

export default KakaoLogin;
