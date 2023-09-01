import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { FiSearch } from "react-icons/fi";
import { authInstance } from "../../API/utils";
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

export default function AddStoreToEarning() {
  //variable management---------------------------
  const navigation = useNavigate();
  // state management-----------------------------
  const [membershipBrand, setMembershipBrand] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const membershipBrandData = await authInstance.get(
          "/payment/membership/",
          {
            params: {
              brand: "OKDK",
            },
          }
        );
        setMembershipBrand(membershipBrandData.data);
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddBrand = () => {
    async function fetchAccumulateData() {
      const requestData = {
        brand: "OKDK",
        serial_num: "1234567890",
      };
      try {
        const accumulateData = await authInstance.post(
          "/payment/membership/create/",
          requestData
        );
        navigation("/EarningInfomation");
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchAccumulateData();
  };

  return (
    <>
      <TopNavigation navigation={navigation} destination={"Payment"} />
      <Modal
        title={"멤버십을 적립할\n 브랜드를 선택해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      >
        <SearchInputWrap>
          <SearchInput />
          <SearchButton>
            <FiSearch size={"1.25rem"} />
          </SearchButton>
        </SearchInputWrap>
        <BrandComponentWrap>
          {membershipBrand.map((data, index) => (
            <BrandComponent onClick={() => handleAddBrand()} key={index}>
              {data.name}
            </BrandComponent>
          ))}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}
