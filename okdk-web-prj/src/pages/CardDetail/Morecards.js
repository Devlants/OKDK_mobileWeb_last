// Morecards

import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import Card from "../../components/Card";
import styled from "styled-components";
import DirectInput from "./DirectInput";
import BasicButton from "../../components/Button";
import { useNavigate } from "react-router-dom";

import cardlists from "../../mock/Card_list.json";
import axios from "axios";
export default function Morecards() {
  const [cards, setcards] = useState([]);
  const [selectedcard, setSelectedcard] = useState(null);
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxOTkxNDEyLCJpYXQiOjE2OTE5ODc4MTIsImp0aSI6Ijg3ZmFlMDI5ZmFjZTQ4NmY5MDlmYjQ4NGFjYTU1ZWVmIiwidXNlcl9pZCI6Nn0.loGzGDjELszS6opKIFq_NDzpqXArksNPJbss_TseN1w";

  // const accessToken = localStorage.getItem("access"); //access Token
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const cardlist = await axios.get(
          "/payment/card/list/",
          config
        );

        console.log(cardlist.data);

        setcards(cardlist.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  console.log(cards);
  const navigation = useNavigate();
  const Container = styled.div`
   height: '477px';
   overflow-y: scroll;
  `;



const handlecardChange = (card) => {
  console.log(card);
  setSelectedcard(card);
};

const handlecardDelete = async () => {
  try {
    const requestData = {
      "id": selectedcard,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const cardlist = await axios.get(
      "/payment/card/create/",
      requestData,
      config
    );

    console.log(cardlist.data);

    setcards(cardlist.data);
  } catch (error) {
    console.error("에러 발생:", error);
  }
};


  const handleEnrollMove = () => {
    navigation("/CardEnroll");
  };
  
const handleModfiyMove = () => {
  console.log(selectedcard);
  // 여기서 navigation을 이용하여 CardModify 컴포넌트로 이동하면서 선택한 카드 정보도 함께 전달합니다.
  navigation("/CardModify", { state : selectedcard });
};
  const handlePaymentMove = () => {
    navigation("/Payment");
  };
  return (
    <div>
      <TopNavigation />
      <Modal
        title="결제카드"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
        <div style={{ textAlign: "left" }}>
          기본으로 결제할 카드를 설정해주세요
        </div>
        <Container>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ></section>
          <section style={{ padding: "55px" }}>
            {cards.map((card) => (
              <>
              <div>
                <Card
                imgWidth="9.89581rem"
                imgHeight="6.25rem"
                imguri={card.image}
                imgBorderRadius="7px"/>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <input type="radio" 
                    value={card.id}
                    checked={selectedcard === card.id}
                    onChange={() => handlecardChange(card.id)}
                    />
                  <p style={{ padding: "5px" }}>{card.name}</p>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}></div>
              </>
            ))}
          </section>
          <BasicButton
            btnName="카드 등록하기"
            onClick={handleEnrollMove}
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
            btnName="수정"
            onClick={handleModfiyMove}
            width="6.5rem"
            height="3.5rem"
            backgroundColor="#056CF2"
            borderRadius="30px"
            font-size="1.25rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
          />
          <BasicButton
            btnName="삭제"
            onClick={handlecardDelete}
            width="6.5rem"
            height="3.5rem"
            backgroundColor="#056CF2"
            borderRadius="30px"
            font-size="1.25rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
          />
        </Container>
      </Modal>
    </div>
  );
}
