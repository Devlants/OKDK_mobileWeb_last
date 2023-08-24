import React from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import { useNavigate, useLocation } from "react-router-dom";
import BasicButton from "../../components/Button";

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

export const PaymentWrap = styled.div`
  width: 90%;
  min-height: 32.5rem;
  border-radius: 1.25rem;
  background: #fff;
  padding: 1.25rem;
  box-sizing: border-box;
  margin-bottom: 1.56rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FaceImage = styled.img`
  border-radius: 10%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function FaceRegistration() {
  // navigation management-----------------------------
  const navigation = useNavigate();
  // parameter management------------------------------
  const location = useLocation();
  const user = location.state && location.state.user;
  console.log(user);
  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"얼굴데이터를 관리합니다."}
        />
        <PaymentWrap>
          <div
            style={{
              width: "15rem",
              height: "20rem",
              marginBottom: "2rem",
            }}
          >
            <FaceImage src={user.image} width={"50%"} />
          </div>
          <BasicButton
            width={"15rem"}
            height={"3rem"}
            btnName="갱생하기"
            // onClick={() => navigation("/AddStoreToEarning")}
          />
        </PaymentWrap>
      </ScrollWrap>
    </Body>
  );
}
