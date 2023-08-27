//cardaEnroll
import React from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import Directinput from "./DirectInput";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
export default function CardEnroll() {
    const navigation = useNavigate();
  const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  `;

  const handlePaymentMove = () => {
    navigation("/Payment");
  };
  return (
    <div>
      <TopNavigation />
      <Modal
        title="카드 등록"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          >
            <BasicButton
              btnName="직접 입력"
              onClick={() => navigation("/DirectInput")}
              width="15rem"
              height="3.5rem"
              backgroundColor="#056CF2"
              borderRadius="30px"
              font-size="1.25rem"
              color="white"
              font-family="Pretendard"
              font-weight="bold"
            />

            <BasicButton
              btnName="카메라 촬영"
              onClick={() => navigation("/Camera")}
              width="15rem"
              height="3.5rem"
              backgroundColor="#056CF2"
              borderRadius="30px"
              font-size="1.25rem"
              color="white"
              font-family="Pretendard"
              font-weight="bold"
            />
          </div>
        </Container>
      </Modal>
    </div>
  );
}
