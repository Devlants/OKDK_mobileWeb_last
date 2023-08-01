import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TopNavigation from "../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import ListBox from "../components/ListBox";
import Card from "../components/Card";
import PaymentTitle from "../components/PaymentTitle";
import payment_main from "../mock/payment_main.json";
import Barcode from "../components/Barcode";
import MonthlyPayment from "../components/MonthlyPayment";

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

export const UndefinedText = styled.text`
  color: #aaaaaa;
`;

export default function Payment() {
  //variable management---------------------------
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  //state management------------------------------
  const [user, setUser] = useState({});
  const [card, setCard] = useState({});
  const [barcode, setBarcode] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState("");

  //Randering management--------------------------
  //axios function
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    async function fetchData() {
      try {
        const userData = await axios.get("/account/user/", config);
        const basicCardData = await axios.get(
          "/account/user/default/card/",
          config
        );
        const barcodeData = await axios.get(
          "/payment/membership/list/",
          config
        );
        const paymentDetailData = await axios.get("/order/recents/", config);

        // console.log(userData.data);
        // console.log(basicCardData.data);
        // console.log(barcodeData.data);
        console.log(paymentDetailData.data);

        setUser(userData.data);
        // setCard(basicCardData.data);
        setBarcode(barcodeData.data);
        setPaymentDetail(paymentDetailData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user.nickname || "익명"}
          describe={"적립 관리 화면입니다."}
        />
        <ListBox listTitle={"결제 카드"}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card.name ? (
              <>
                <Card
                  Width={"6.333331rem"}
                  Height={"4rem"}
                  imgWidth={"6.333331rem"}
                  imgHeight={"4rem"}
                />
                <text>{card.name}</text>
              </>
            ) : (
              <UndefinedText>결제 카드를 등록해 주세요</UndefinedText>
            )}
          </div>
        </ListBox>
        <ListBox listTitle={"적립 바코드"}>
          {/* {payment_main.barcode.map((data, index) => (
              <Barcode
                img={data.barcodeimg}
                num={data.barcodenum}
                name={data.barcodename}
              />
            ))} */}

          {barcode.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                overflowX: "auto",
              }}
            >
              {barcode.map((data, index) => (
                <Barcode
                  key={index}
                  // img={data.barcodeimg}
                  // name={data.barcodename}
                  num={data.serial_num}
                />
              ))}
            </div>
          ) : (
            <UndefinedText>결제 카드를 등록해 주세요</UndefinedText>
          )}
        </ListBox>
        <ListBox listTitle={"이번달 결제 내역"}>
          <div
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: 700,
              fontStyle: "normal",
              fontFamily: "Pretendard",
            }}
          >
            {/* 총 {payment_main.totalpayment}원 총 {paymentDetail}원 */}
          </div>
        </ListBox>
        <ListBox listTitle={"월별 결제 내역"}>
          <MonthlyPayment monthlypayment={payment_main.monthlypayment} />
        </ListBox>
      </ScrollWrap>
    </Body>
  );
}
