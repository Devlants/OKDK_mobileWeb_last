import React from "react";
import styled from "styled-components";

import BasicButton from "./Button";

const ListBoxContainer = styled.div`
  width: 20rem;
  min-height: 9rem;
  height: fit-content;
  margin-bottom: 1.5rem;
  border-radius: 1.25rem;
  //border: 1px solid #96b3d9;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #96b3d9;

  /* backdrop-filter: blur(3px); */
  position: relative;
`;

const BlurEffect = styled.div`
  backdrop-filter: blur(3px);
  width: calc(100% + 5px);
  height: fit-content;
  min-height: 9rem;
  border-radius: 1.25rem;
  position: relative;
  top: 3px;
  right: 3px;
  bottom: 10px;
  left: -3px;
`;

const TitleText = styled.p`
  margin: 0;
  color: #000;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TitleContainer = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0px;
  align-items: center;
  background-color: transparent;
`;

const ChildrenContainer = styled.div`
  padding: 0px 10px 10px 5px;
  box-sizing: border-box;
  background-color: transparent;
`;

const ListBox = ({
  listTitle,
  children,
  handleShowMore,
  handleDelete,
  btnName,
}) => {
  return (
    <ListBoxContainer>
      <BlurEffect>
        <TitleContainer>
          <TitleText>{listTitle}</TitleText>
          <ButtonContainer>
            {handleDelete && (
              <BasicButton
                btnName={"삭제하기"}
                onClick={handleDelete}
                width={"5rem"}
                gi
                height={"1.8rem"}
                backgroundColor="#ef4444"
                borderRadius="1.25rem"
                fontSize="1rem"
                color="#FFF"
                fontFamily="Pretendard"
                fontWeight="bold"
              />
            )}
            {handleShowMore && (
              <BasicButton
                btnName={btnName ? btnName : "더보기"}
                onClick={handleShowMore}
                width={btnName ? "5rem" : "4.1rem"}
                gi
                height={"1.8rem"}
                backgroundColor="#056CF2"
                borderRadius="1.25rem"
                fontSize="1rem"
                color="#FFF"
                fontFamily="Pretendard"
                fontWeight="bold"
              />
            )}
          </ButtonContainer>
        </TitleContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
      </BlurEffect>
    </ListBoxContainer>
  );
};

export default ListBox;
