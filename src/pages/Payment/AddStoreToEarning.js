import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { FiSearch } from "react-icons/fi";
import { authInstance } from "../../API/utils";
import { AiFillCheckCircle } from "react-icons/ai";

export const SearchInputWrap = styled.div`
  width: 17.5rem;
  height: 1.875rem;
  border: none;
  border-bottom: 1px solid #a4a4a4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
`;

export const BrandComponentWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열의 그리드로 설정 */
  gap: 0.75rem; /* 컴포넌트 사이의 간격 */
  box-sizing: border-box;
  padding: 1.25rem 0rem;
  overflow-y: auto;
`;

export const BrandComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #a4a4a4;
  background-color: #d9d9d9;
  color: white;
  width: 5.25em;
  height: 5.25rem;
`;

export const CheckIcon = styled(AiFillCheckCircle)`
  position: absolute;
  z-index: 1;
  color: #056cf2;
`;

export default function AddStoreToEarning() {
  //variable management---------------------------
  const navigation = useNavigate();
  // state management-----------------------------
  const [nonMembershipBrand, setNonMembershipBrand] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStoreName, setSelectedStoreName] = useState(null);

  const handleSelect = (id) => {
    setSelectedStore((prevStore) => {
      if (prevStore === id) {
        return null;
      } else {
        return id;
      }
    });

    const storeName = nonMembershipBrand.find(
      (element) => element.id === id
    ).name;
    setSelectedStoreName(storeName);
  };

  const handleButtonClick = () => {
    navigation("/BarcodeRegistration", {
      state: { brand: selectedStoreName },
      replace: true,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const membershipBrandData = await authInstance.get(
          "/payment/membership/"
        );
        setNonMembershipBrand(membershipBrandData.data);
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedStore, selectedStoreName);
  }, [selectedStore, selectedStoreName]);

  return (
    <>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <Modal
        title={"멤버십을 적립할\n 브랜드를 선택해주세요"}
        basicButtonName="확인"
        buttonDisable={selectedStore === null}
        basicButtonOnClick={() => handleButtonClick()}
      >
        <BrandComponentWrap>
          {nonMembershipBrand.map((data, index) => (
            <BrandComponent
              onClick={() => {
                handleSelect(data.id);
              }}
              key={index}
            >
              {selectedStore === data.id && <CheckIcon size={"3rem"} />}
              {selectedStore !== data.id && data.name}
            </BrandComponent>
          ))}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}
