//cardaEnroll
import React from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import Directinput from "./DirectInput";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
export default function EnrollComplete() {
    const navigation = useNavigate();
  const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  `;

  const handlePaymentMove = () => {
    navigation("/Morecards");
  };
  return (
    <div>
      <TopNavigation />
      <Modal
        title=""
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: 'center',
              height: "100%",
            }}
          >
            <Card 
             width="11.875rem"
             height="7.5rem"
             imgWidth="11.875rem"
             imgHeight="7.5rem"
             imgBorderRadius="0.4375rem"
             backgroundColor="#D9D9D9"
             borderRadius="0.4375rem"/>
            <p style={{marginTop: '1rem',
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 'normal'
        }}>등록이 완료되었어요</p>
          </div>
        </Container>
      </Modal>
    </div>
  );
}
