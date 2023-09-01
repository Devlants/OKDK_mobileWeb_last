import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { FiSearch } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";

import { authInstance } from "../../API/utils";

export default function AddStoreToEarning() {
  //variable management---------------------------
  const navigation = useNavigate();
  const accessToken = localStorage.getItem("access"); //access Token

  // state management-----------------------------
  const [nonFavoriteBrandData, setNonFavoriteBrandData] = useState([]);
  const [user, setUser] = useState(null);
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
  };

  const handleButtonClick = () => {
    //다음 페이지 넘어감
    navigation("/AddFavoriteMenu", {
      state: { selectedStore, selectedStoreName },
    });
    localStorage.setItem(
      "StoreName",
      `${nonFavoriteBrandData[selectedStore - 1].name}`
    ); // 브랜드이름 로컬스토리지 등록
    localStorage.setItem("StoreId", `${selectedStore}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await authInstance.get("/account/user/");
        const nonFavoriteBrandData = await authInstance.get(
          "/coffee/brand/nonFavorite/list/"
        );

        setUser(userData.data.user);
        setNonFavoriteBrandData(nonFavoriteBrandData.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <TopNavigation navigation={navigation} destination={"Home"} />
      <Modal
        title={`${
          user ? user.nickname : "익명"
        }님이\n 즐겨찾는 매장을 설정해주세요`}
        basicButtonName="확인"
        buttonDisable={selectedStore === null}
        basicButtonOnClick={() => handleButtonClick()}
      >
        <SearchInputWrap>
          <SearchInput />
          <SearchButton>
            <FiSearch size={"1.25rem"} />
          </SearchButton>
        </SearchInputWrap>
        <BrandComponentWrap>
          {nonFavoriteBrandData.map((data, index) => (
            <BrandComponent key={index} onClick={() => handleSelect(data.id)}>
              {selectedStore === data.id && <CheckIcon size={"3rem"} />}
              {selectedStore !== data.id && data.name}
            </BrandComponent>
          ))}
        </BrandComponentWrap>
      </Modal>
    </>
  );
}

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
  color: black;
  width: 5.25em;
  height: 5.25rem;
`;

export const CheckIcon = styled(AiFillCheckCircle)`
  position: absolute;
  z-index: 1;
  color: #056cf2;
`;
