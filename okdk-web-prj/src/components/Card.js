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
const Card = ({
  width,
  height,
  backgroundColor,
  borderRadius,
}) => {
  return (
    <Cardbox
      width={width}
      height={height}
      background-color={backgroundColor}
      border-radius={borderRadius}
    >
    </Cardbox>
  );
};

export default Card;
