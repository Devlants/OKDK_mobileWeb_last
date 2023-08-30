import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import axios from "axios";
import { authInstance } from "../../API/utils";

export const Body = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background-color: #f5f7fb;
`;
export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListBoxContainer = styled.div`
  width: 20rem;
  height: fit-content;
  border-radius: 1.25rem;
  //border: 1px solid #96b3d9;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #96b3d9;
  margin-bottom: 2.25rem;
  /* backdrop-filter: blur(3px); */
  position: relative;
`;

const BlurEffect = styled.div`
  backdrop-filter: blur(3px);
  width: calc(100% + 5px);
  height: fit-content;
  border-radius: 1.25rem;
  position: relative;
  top: 3px;
  right: 3px;
  bottom: 10px;
  left: -3px;
`;
export const ItemContainer = styled.div`
  width: 20rem;
  height: 4rem;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Setting() {
  const navigation = useNavigate();
  //state management------------------------------
  const [user, setUser] = useState(null);
  const [social, setSocial] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await authInstance.get("/account/user/");
        setUser(userData.data.user);
        setSocial(userData.data.social);
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  //로그아웃 함수들
  const KakaoLogout = async () => {
    console.log("카카오 로그아웃");
    const accessToken = localStorage.getItem("access"); //access Token
    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      localStorage.clear();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    console.log("native asyncStorage 없애기");
    //react-native에 메세지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          status: "logout",
        })
      );
    }

    localStorage.clear();
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"설정화면 입니다."}
        />
        <ListBoxContainer
          onClick={() => {
            navigation("/FaceRegistration", {
              state: { user: user },
            });
          }}
          style={{
            marginTop: "7.3rem",
          }}
        >
          <BlurEffect>
            <ItemContainer>얼굴 데이터 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer
          onClick={() => {
            navigation("/AccountOfficer", {
              state: { user: user, social: social },
            });
          }}
        >
          <BlurEffect>
            <ItemContainer>계정 관리</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>
        <ListBoxContainer onClick={() => handleLogout()}>
          <BlurEffect>
            <ItemContainer>로그아웃</ItemContainer>
          </BlurEffect>
        </ListBoxContainer>

        {/* <ListBoxContainer
          onClick={() => {
            navigation("/ThemeSetting", {
              state: { user: user },
            });
          }}
        >
          <BlurEffect>
            <ItemContainer>테마 설정</ItemContainer>
          </BlurEffect>
        </ListBoxContainer> */}
      </ScrollWrap>
    </Body>
  );
}
