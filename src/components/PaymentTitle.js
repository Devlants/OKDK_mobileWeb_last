import React from "react";
import styled from "styled-components";

export const TitleWrap = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
  box-sizing: border-box;
  padding: 1.25rem;
`;

export const PaymentSubTitle = styled.div`
  width: 100%;
  display: flex;
`;

export default function PaymentTitle({ name, describe }) {
  return (
    <TitleWrap>
      <PaymentSubTitle>{name}님</PaymentSubTitle>
      <PaymentSubTitle>{describe ? describe : "설명 텍스트"}</PaymentSubTitle>
    </TitleWrap>
  );
}
