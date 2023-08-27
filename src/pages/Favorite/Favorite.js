import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicButton from "../../components/Button";
import TopNavigation from "../../components/TopNavigation";
import styled from "styled-components";
import PaymentTitle from "../../components/PaymentTitle";
import ListBox from "../../components/ListBox";
import CoffeeComponent from "../../components/CoffeeComponent";

//import favoriteList from "../../mock/favoriteList.json"; //mock

import { useNavigate } from "react-router-dom";

export default function Favorite() {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [favoriteList, setFavoriteList] = useState({});
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const accessToken = localStorage.getItem("access"); //access Token
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const userData = await axios.get("/account/user/", config);
      const brandList = await axios.get("/coffee/brand/list/", config);
      const favoriteList = await axios.get("/order/favorite/", config);

      setUser(userData.data.user);
      setFavoriteList(favoriteList.data);
      setBrandList(brandList.data);
    } catch (error) {
      console.error("에러 발생:", error);

      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          console.log("fetchData 재시도");
          await fetchData();
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          navigation("/login");
        }
      }
    }
  }

  const refreshAccessToken = async () => {
    const body = {
      refresh: localStorage.getItem("refresh"),
    };

    try {
      const response = await axios.post(
        "/account/refresh/access_token/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const access = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      console.log("success : refresh Access Token");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  const handleEditButtonClick = (selectedStoreName) => {
    //수정하기 버튼

    const [selectedStoreId] = brandList
      .filter((item) => item.name === selectedStoreName)
      .map((item) => item.id);

    navigation("/AddFavoriteMenu", {
      state: { selectedStoreId, selectedStoreName },
    });

    localStorage.setItem("StoreName", `${selectedStoreName}`); // 브랜드이름 로컬스토리지 등록
    localStorage.setItem("StoreId", `${selectedStoreId}`);
  };

  const handleDeleteButtonClick = async (selectedStoreName) => {
    const accessToken = localStorage.getItem("access");
    const [selectedStoreId] = brandList
      .filter((item) => item.name === selectedStoreName)
      .map((item) => item.id);
    const data = {
      id: selectedStoreId,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    console.log(data);

    try {
      await axios.delete("/order/favorite/", config);
      await fetchData();
    } catch (error) {
      console.error("삭제 중 에러 발생:", error);

      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          console.log("재시도");
          await handleDeleteButtonClick(selectedStoreName);
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          navigation("/login");
        }
      }
    }
  };

  return (
    <Body>
      <TopNavigation navigation={navigation} />
      <ScrollWrap>
        <PaymentTitle
          name={user ? user.nickname : "익명"}
          describe={"즐겨찾는 메뉴입니다"}
        />
        {favoriteList && Object.keys(favoriteList).length > 0
          ? Object.keys(favoriteList).map((item, index) => {
              const value = favoriteList[item];
              return (
                <ListBox
                  key={index}
                  listTitle={item}
                  btnName={"수정하기"}
                  handleShowMore={() => handleEditButtonClick(item)}
                  handleDelete={() => handleDeleteButtonClick(item)}
                >
                  <FavoriteMenuWarp>
                    {value.map((valueItem, valueIndex) => {
                      return (
                        <CoffeeComponent
                          key={valueIndex}
                          imgURI={valueItem?.menu?.image}
                          first_description={valueItem?.menu?.name}
                          second_description={`${valueItem?.menu?.price}원`}
                          background="#0583F2"
                        ></CoffeeComponent>
                      );
                    })}
                  </FavoriteMenuWarp>
                </ListBox>
              );
            })
          : "즐겨찾는 매장이 없습니다."}

        <BasicButton
          btnName="매장 추가 하기"
          onClick={() => {
            navigation("/AddStoreToFavorite");
          }}
          width="20rem"
          height="4rem"
          backgroundColor="#056CF2;"
          borderRadius="1.875rem"
          fontSize="1.5rem"
          color="white"
          fontFamily="Pretendard"
          fontWeight="bold"
        />
      </ScrollWrap>
    </Body>
  );
}

export const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #f5f7fb;
`;

export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FavoriteMenuWarp = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 0.5rem;
  overflow: auto;
  white-space: nowrap;
`;
