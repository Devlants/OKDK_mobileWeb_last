import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { FiSearch } from "react-icons/fi";

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
  const navigation = useNavigate();
  // const accessToken = localStorage.getItem("access"); //access Token

  // const [membershipBrand, setMembershipBrand] = useState([]);

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     params: {
  //       brand: "OKDK",
  //     },
  //   };
  //   async function fetchData() {
  //     try {
  //       const membershipBrandData = await axios.get(
  //         "/payment/membership/",
  //         config
  //       );

  //       console.log(membershipBrandData.data);

  //       setMembershipBrand(membershipBrandData.data);
  //     } catch (error) {
  //       console.error("에러 발생:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <TopNavigation />
      <Modal
        title={"익명님이\n즐겨찾는 매장을 설정해주세요"}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation("/AddFavoriteMenu")}
      >
        <SearchInputWrap>
          <SearchInput />
          <SearchButton>
            <FiSearch size={"1.25rem"} />
          </SearchButton>
        </SearchInputWrap>
        <BrandComponentWrap>
          {/* {membershipBrand.map((data, index) => (
            <BrandComponent key={index}>{data.name}</BrandComponent>
          ))} */}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}