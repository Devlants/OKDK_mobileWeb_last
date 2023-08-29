import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => (props.width ? props.width : "20rem")};
  height: ${(props) => (props.height ? props.height : "4rem")};
  color: white;
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "#056CF2"};
  border-radius: ${(props) =>
    props.$borderRadius ? props.$borderRadius : "30px"};
  margin: ${(props) => (props.margin ? props.margin : "0.5rem")};

  &:hover {
    color: white;
    cursor: pointer;
  }
  &:active {
    filter: brightness(75%); //클릭시 좀더 찐하게
  }
`;

const Text = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5rem")};
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "Pretendard"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "700")};
  text-align: center;
  margin: 0px;
`;

const Image = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const ButtonWarp = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const BasicButton = ({
  btnName,
  onClick,
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  imguri,
  margin,
}) => {
  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      $backgroundColor={backgroundColor} // camelCase 사용
      $borderRadius={borderRadius} // camelCase 사용
      margin={margin}
    >
      <ButtonWarp>
        {imguri ? <Image src={imguri} /> : null}
        <Text
          fontSize={fontSize} // camelCase 사용
          color={color} // camelCase 사용
          fontFamily={fontFamily} // camelCase 사용
          fontWeight={fontWeight} // camelCase 사용
        >
          {btnName}
        </Text>
      </ButtonWarp>
    </Button>
  );
};

export default BasicButton;
