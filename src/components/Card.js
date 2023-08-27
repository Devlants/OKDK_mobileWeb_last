import React from "react";
import styled from "styled-components";

const Cardbox = styled.div`
  width: ${(props) => (props.width ? props.width : "9.89581rem")};
  height: ${(props) => (props.height ? props.height : "6.25rem")};
  border: none;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#D9D9D9"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "7px"};
  &:hover {
    cursor: pointer;
  }
`;

const CardImage = styled.div`
  width: ${(props) => (props.width ? props.width : "9.89581rem")};
  height: ${(props) => (props.height ? props.height : "6.25rem")};
  border: none;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#D9D9D9"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "7px"};
  &:hover {
    cursor: pointer;
    object-fit: contain;
  }
`;
const Card = ({ width, height, imgWidth, imgHeight, imgBorderRadius, backgroundColor, borderRadius, imguri }) => {
  if (imguri) {
    return (
      <img
        src={imguri}
        style={{
          width: imgWidth,
          height: imgHeight,
          borderRadius: imgBorderRadius,
        }}
        alt=""
      />
    );
  } else {
    return (
      <Cardbox
        width={width}
        height={height}
        background-color={backgroundColor}
        border-radius={borderRadius}
      ></Cardbox>
    );
  }
};

export default Card;
