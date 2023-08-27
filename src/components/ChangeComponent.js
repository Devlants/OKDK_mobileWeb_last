import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { ReactComponent as SelectLadder } from "../assets/images/selectLadder.svg";
import { ReactComponent as ChangeArrow } from "../assets/images/changeArrow.svg";
import { ReactComponent as SelectedLadder } from "../assets/images/selectedLadder.svg";

function ChangeComponent({ handleParentClick }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [easyMode, setEasyMode] = useState(false);

  const handleChangeButton = () => {
    if (isAnimating) {
      return; // 애니메이션 진행중일 때는 아무 작업도 수행하지 않고 함수를 종료
    }
    setIsAnimating(true);
    setEasyMode((prevEasyMode) => !prevEasyMode);

    if (handleParentClick) {
      handleParentClick();
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <ListBoxContainer>
      <ChildrenContainer>
        <BlurEffect>
          <OverlayText1 $easyMode={easyMode}>
            {!easyMode
              ? [
                  "현재",
                  <br key="1" />,
                  "일반 키오스크",
                  <br key="2" />,
                  "모드 입니다",
                ]
              : [
                  "일반 키오스크",
                  <br key="1" />,
                  "모드로",
                  <br key="2" />,
                  "변경하기",
                ]}
          </OverlayText1>

          <OverlayText2 $easyMode={easyMode}>
            {!easyMode
              ? ["쉬운 모드로", <br key="1" />, "변경하기"]
              : ["쉬운 모드", <br key="1" />, "입니다"]}
          </OverlayText2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <SelectLadder
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                opacity: easyMode ? 0 : 1,
                transition: "opacity 0.5s",
              }}
            />
            <SelectedLadder
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                transform: "translateX(-4.5rem)",
                opacity: easyMode ? 1 : 0,
                transition: "opacity 0.5s",
              }}
            />
          </div>
        </BlurEffect>

        <ChangeButton onClick={handleChangeButton}>
          <ChangeArrowContainer
            className={isAnimating ? "rotateAnimation" : ""}
          >
            <ChangeArrow />
          </ChangeArrowContainer>
        </ChangeButton>
      </ChildrenContainer>
    </ListBoxContainer>
  );
}

const ListBoxContainer = styled.div`
  width: 20rem;
  min-height: 9rem;
  height: fit-content;
  margin-bottom: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid #96b3d9;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #96b3d9;
  position: relative;
`;

const BlurEffect = styled.div`
  backdrop-filter: blur(3px);
  width: calc(100% + 5px);
  height: calc(100% + 5px);
  border-radius: 1.25rem;
  position: absolute;
  top: -3px;
  right: -3px;
  bottom: -3px;
  left: -3px;

  display: flex;
`;

const ChildrenContainer = styled.div`
  padding: 0px 10px 10px 5px;
  box-sizing: border-box;
  background-color: transparent;
  height: 9rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1260deg); /* 4바퀴(360도 * 3) 회전 */
  }
`;

const ChangeButton = styled.button`
  width: 3rem;
  height: 3rem;
  fill: #f5f7fb;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: none;
  border-radius: 100px;
  top: 5px;

  position: relative; /* Add relative positioning */
  display: flex;
  justify-content: center;
  align-items: center;

  animation: none; /* 초기에는 애니메이션을 적용하지 않음 */
  &.rotateAnimation {
    animation: ${rotateAnimation} 2s linear; /* 회전 애니메이션을 2초간 진행 */
  }
`;

const OverlayText1 = styled.div`
  position: absolute;
  top: 45px; /* 원하는 위치로 조정하세요 */
  left: 20px; /* 원하는 위치로 조정하세요 */
  color: ${(props) => (!props.$easyMode ? "white" : "black")};

  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;

  z-index: 1;
`;

const OverlayText2 = styled.div`
  position: absolute;
  top: 70px; /* 원하는 위치로 조정하세요 */
  left: 210px; /* 원하는 위치로 조정하세요 */
  color: ${(props) => (props.$easyMode ? "white" : "black")};

  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;

  z-index: 1;
`;

const ChangeArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: none; /* 초기에는 애니메이션을 적용하지 않음 */

  &.rotateAnimation {
    animation: ${rotateAnimation} 2s ease-out; /* 회전 애니메이션을 2초간 진행 */
  }
`;

export default ChangeComponent;
