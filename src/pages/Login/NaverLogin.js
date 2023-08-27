import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "../../assets/loading-spinner.gif";

const NaverLogin = (props) => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const naverLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/account/naver/callback/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ data: "성공" })
          );
        }
        const access_token = res.data["access"];
        const refresh_token = res.data["refresh"];

        //react-native에 메세지 전송
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              status: "success",
              access_token: access_token,
              refresh_token: refresh_token,
            })
          );
        }

        localStorage.setItem("access", access_token);
        localStorage.setItem("refresh", refresh_token);

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

    naverLogin();
  }, []);

  return (
    <div
      style={{
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
        네이버 로그인 중입니다. <br />
        조금만 기다려주세요!
      </div>
    </div>
  );
};

export default NaverLogin;
