import React from "react";
import styled from "styled-components";
import TopNavigation from "../../components/TopNavigation";
import PaymentTitle from "../../components/PaymentTitle";
import { useNavigate, useLocation } from "react-router-dom";

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
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  background: #fff;
  padding: 1.25rem;
  box-sizing: border-box;
`;

export const CreatedAtWrap = styled.p`
  color: #595959;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: start;
`;

export const TotalPriceWrap = styled.div`
  color: #0583f2;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 0.78rem;
`;

export const MenuTitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 2.95rem;
  text-align: start;
`;

export const MenuItemWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  margin-top: 0.78rem;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const GoBackButton = styled.button`
  width: 90%;
  height: 4rem;
  background-color: #056cf2;
  flex-shrink: 0;
  margin: 0;
  border: none;
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  margin-bottom: 1.56rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default function PaymentHistoryReceipt() {
  //variable management

  // navigation management-----------------------------
  const navigation = useNavigate();
  // parameter management------------------------------
  const location = useLocation();
  const payment = location.state && location.state.payment;
  const user = location.state && location.state.user;
  return (
    <Body>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <ScrollWrap>
        <PaymentTitle name={user || "익명"} describe={"결제내역 입니다."} />
        <PaymentWrap>
          <CreatedAtWrap>{payment.created_at.slice(0, 10)}</CreatedAtWrap>
          <TotalPriceWrap>{payment.totalPrice}원</TotalPriceWrap>
          <MenuTitle>메뉴</MenuTitle>
          {payment.options.map((data, index) => (
            <MenuItemWrap key={index}>
              <p
                style={{
                  textAlign: "start",
                }}
              >
                {data.menu.name}
              </p>
              <p>{data.quantity}잔</p>
              <p>{data.menu.price}원</p>
            </MenuItemWrap>
          ))}
        </PaymentWrap>
        <GoBackButton onClick={() => navigation(-1)}>이전으로</GoBackButton>
      </ScrollWrap>
    </Body>
  );
}
