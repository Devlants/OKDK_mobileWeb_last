import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { useNavigate } from "react-router-dom";
import ListBox from "../../components/ListBox";
import Card from "../../components/Card";
import PaymentTitle from "../../components/PaymentTitle";
import payment_main from "../../mock/payment_main.json";
import Barcode from "../../components/Barcode";
import MonthlyPayment from "../../components/MonthlyPayment";
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

export const UndefinedText = styled.p`
  color: #aaaaaa;
`;

export default function Payment() {
  //variable management---------------------------
  const navigation = useNavigate();

  //state management------------------------------
  const [user, setUser] = useState(null);
  const [card, setCard] = useState(null);
  const [barcode, setBarcode] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [monthKey, setMonthKey] = useState([]);
  //Randering management--------------------------
  //axios function
  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await authInstance.get("/account/user/");
        const basicCardData = await authInstance.get(
          "/account/user/default/card/"
        );
        const barcodeData = await authInstance.get("/payment/membership/list/");
        const monthlyData = await authInstance.get("/order/month/");

        // console.log(userData.data);
        // console.log(basicCardData.data);
        // console.log(barcodeData.data);
        // console.log(basicCardData.data);
        setUser(userData.data.user);
        setCard(basicCardData.data);
        setBarcode(barcodeData.data);
        setMonthlyPayment(monthlyData.data);
        setMonthKey(Object.keys(monthlyData.data).sort()); //object 접근을 위한 key 배열
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Body>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"적립 관리 화면입니다."}
        />
        <ListBox
          listTitle={"결제 카드"}
          handleShowMore={() => {
            navigation("/morecards");
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card ? (
              <>
                <Card
                  Width={"6.333331rem"}
                  Height={"4rem"}
                  imgWidth={"6.333331rem"}
                  imgHeight={"4rem"}
                />
                <p>{card.name}</p>
              </>
            ) : (
              <UndefinedText>결제 카드를 등록해 주세요</UndefinedText>
            )}
          </div>
        </ListBox>
        <ListBox
          listTitle={"적립 바코드"}
          handleShowMore={() => {
            navigation("/EarningInfomation");
          }}
        >
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
                  img={data.image}
                  name={data.brand}
                  num={data.serial_num}
                />
              ))}
            </div>
          ) : (
            <UndefinedText>바코드를 등록해 주세요</UndefinedText>
          )}
        </ListBox>
        <ListBox
          listTitle={"이번달 결제 내역"}
          handleShowMore={() => {
            navigation("/PaymentDetail", {
              state: {
                month: monthKey
                  ? monthKey[monthKey.length - 1].slice(1, 2)
                  : null,
              },
            });
          }}
        >
          {monthKey.length > 0 ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 700,
                fontStyle: "normal",
                fontFamily: "Pretendard",
              }}
            >
              총 {monthlyPayment[[monthKey[monthKey.length - 1]]].total}원
            </div>
          ) : (
            <UndefinedText>이번달 결제 내역이 없어요.</UndefinedText>
          )}
        </ListBox>
        <ListBox listTitle={"월별 결제 내역"}>
          {/* {monthKey.map((data, index) => {
            console.log(monthlyPayment[data]);
          })} */}
          {/* <MonthlyPayment
            labels={monthKey}
            data={monthKey.map((data) => monthlyPayment[data].total)}
          />
          {/* <MonthlyPayment monthlypayment={payment_main.monthlypayment} /> */}
          {/* <UndefinedText>월별 결제 내역이 없어요.</UndefinedText> */}
          {monthKey.length > 0 ? (
            <>
              <MonthlyPayment
                navigation={navigation}
                labels={monthKey}
                data={monthKey.map((data) => monthlyPayment[data].total)}
              />
            </>
          ) : (
            <UndefinedText>월별 결제 내역이 없어요.</UndefinedText>
          )}
        </ListBox>
      </ScrollWrap>
    </Body>
  );
}
