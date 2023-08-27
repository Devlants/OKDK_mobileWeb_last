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

  // const accessToken = localStorage.getItem('access');
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNzk1OTQwLCJpYXQiOjE2OTI3ODg0OTcsImp0aSI6IjMxYmY2YjE4NzY0YjQyNmE4ZmNmNTVjYWQ0NDAyMDZkIiwidXNlcl9pZCI6M30.hweFoac7emAl0ScIKbeE4IidnVAReDBmtroj0-RMOuM";
  const refreshToken = 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5Mjg3NDg5NywiaWF0IjoxNjkyNzg4NDk3LCJqdGkiOiIxY2ZhY2JlODdmMmQ0Y2M1OGVhYmU2ZmQyMTlmNTE3NyIsInVzZXJfaWQiOjN9.N65kqMb4zJrIOc3pBBULmYLi0NUQdRjKosKJ3Jpn4_M";
  localStorage.setItem("refresh", refreshToken);
  useEffect(() => {

    async function fetchData() {
      const accessToken = localStorage.getItem('access');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const cardlist = await axios.get("/payment/card/list/", config);

        console.log(cardlist.data);

        setcards(cardlist.data);
      } catch (error) {
        console.error("에러 발생:", error);
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            console.log("fetchData 재시도");
            await fetchData();
          } catch (refreshError) {
            console.error("토큰 갱신 중 오류:", refreshError);
            // 추가적인 오류 처리 로직 필요 (예: 사용자를 로그인 페이지로 리다이렉트)
          }
        }
      }
    }
    fetchData();
  }, []);
  console.log(cards);
  const navigation = useNavigate();

  const Container = styled.div`
    height: "477px";
    overflow-y: scroll;
  `;

  const handlecardChange = (card) => {
    console.log(card);
    setSelectedcard(card);
  };

  const handlecardDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const requestData = {
        id: selectedcard,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: requestData, // DELETE 요청에서는 data를 사용하여 body를 명시합니다.
      };

      const response = await axios.delete("/payment/card/create/", config);
      console.log(response);
    } catch (error) {
      console.error("에러 발생:", error);
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          console.log("fetchData 재시도");
          await handlecardDelete();
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          // 추가적인 오류 처리 로직 필요 (예: 사용자를 로그인 페이지로 리다이렉트)
        }
      }
    }
  };

  const refreshAccessToken = async () => {
    const body = {
      refresh: localStorage.getItem("refresh"),
    };

    try {
      const response = await axios.post(
        "/account/refresh/access_token/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      console.log("success : refresh Access Token");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error; // 함수를 호출하는 곳에서 오류를 처리할 수 있도록 오류를 다시 던집니다.
    }
  };
  const handleEnrollMove = () => {
    navigation("/CardEnroll");
  };

  const handleModfiyMove = () => {
    console.log(selectedcard);
    // 여기서 navigation을 이용하여 CardModify 컴포넌트로 이동하면서 선택한 카드 정보도 함께 전달합니다.
    navigation("/CardModify", { state: selectedcard });
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
                    imgBorderRadius="7px"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="radio"
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
