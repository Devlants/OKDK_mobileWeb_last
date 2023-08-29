import React from "react";
import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export const BarcodeNumber = styled.p`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BarcodeName = styled.div`
  white-space: nowrap;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BarcodeImage = styled.img`
  width: ${(props) => (props.width ? props.width : "6.25rem")};
  height: ${(props) => (props.height ? props.height : "3.937rem")};
`;
export default function Barcode({ width, height, img, num, name }) {
  return (
    <Wrap>
      <BarcodeImage src={img} width={width} height={height} />
      {num ? <BarcodeNumber>{num}</BarcodeNumber> : null}
      {name ? <BarcodeName>{name}</BarcodeName> : null}
    </Wrap>
  );
}
