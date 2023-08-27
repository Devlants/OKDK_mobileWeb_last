import React, { useState } from "react";
import styled from "styled-components";
import BasicButton from "./Button";

export const Overlay = styled.section`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalWrap = styled.div`
  width: 20rem;
  height: 35rem;
  background-color: white;
  border-radius: 1.25rem;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.span`
  color: black;
  width: 100%;
  height: fit-content;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;
  text-align: left;
`;

export const ModalDocument = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export default function Modal({
  children,
  title,
  basicButtonName,
  basicButtonOnClick,
  buttonDisable,
}) {
  return (
    <>
      <Overlay>
        <ModalWrap onClick={(e) => e.stopPropagation()}>
          <ModalDocument>
            <ModalTitle>{title}</ModalTitle>
            {children}
          </ModalDocument>
        </ModalWrap>
        {basicButtonName && basicButtonOnClick ? (
          <BasicButton
            btnName={basicButtonName}
            onClick={() => {
              if (!buttonDisable) {
                basicButtonOnClick();
              }
            }}
            width="20rem"
            height="4rem"
            backgroundColor={buttonDisable ? "gray" : "#056CF2"}
            borderRadius="30px"
            font-size="1.25rem"
            color="white"
            font-family="Pretendard"
            font-weight="bold"
            disabled={buttonDisable}
          />
        ) : null}
      </Overlay>
    </>
  );
}
