import React from "react";
import styled from "styled-components";

const CoffeeBackground = styled.div`
  height: 3.4rem;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 50%;
  background-color: ${(props) => props.color || "white"};
`;

const CoffeeComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.42806rem;
  height: fit-content;
  margin: 0 5px 10px 10px;
`;

const Image = styled.img`
  width: 2.5rem;
  height: 3.4rem;
  object-fit: cover;
  padding: 0.5rem;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;
const Description = styled.p`
  color: #000;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
  margin-top: 0;
  padding: 0;
`;

const CoffeeComponent = ({
  id,
  imgURI,
  first_description,
  second_description,
  background,
  onClick,
}) => {
  return (
    <CoffeeComponentContainer onClick={onClick}>
      <CoffeeBackground color={background}>
        <Image src={imgURI} alt="Image" />
      </CoffeeBackground>

      <DescriptionContainer>
        <Description>{first_description}</Description>
        <Description>{second_description}</Description>
      </DescriptionContainer>
    </CoffeeComponentContainer>
  );
};

export default CoffeeComponent;
