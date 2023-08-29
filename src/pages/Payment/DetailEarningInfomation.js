import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import axios from "axios";
import { authInstance } from "../../API/utils";

export const ScrollWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const SubTitle = styled.div`
  margin-top: 0.3rem;
  text-align: start;
  width: 100%;
  color: #000;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const PointWrap = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 3rem;
`;

export const HistoryWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CreatedAtWrap = styled.p`
  margin-top: 0.75rem;
  margin-left: 0.5rem;
  text-align: start;
  color: #595959;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-bottom: 1px solid #a4a4a4;
  box-sizing: border-box;
`;

export const TimeWrap = styled.div`
  margin-top: 0.87rem;
  padding: 0 0.5rem 0 0.5rem;
  color: #000;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: space-between;
`;

export const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem 0 0.5rem;
  color: #000;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default function DetailEarningInfomation() {
  // parameter management--------------------------------
  const location = useLocation();
  const brand = location.state && location.state.brand;

  //navigation management--------------------------------
  const navigation = useNavigate();

  //state management-------------------------------------
  const [point, setPoint] = useState(null);
  const [histories, setHistories] = useState([]);

  // 날짜별로 history 분할하는 함수------------------------
  const groupDataByDate = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = item.created_at.slice(0, 10); // "YYYY-MM-DD" 형식의 날짜 추출
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

    return groupedData;
  };

  // when view randering, axios function------------------
  useEffect(() => {
    async function fetchData() {
      const requestData = {
        // brand: brand,
        brand: "OKDK",
      };
      try {
        const membershipBrandData = await authInstance.post(
          "/payment/membership/",
          requestData
        );
        console.log(membershipBrandData.data.histories);
        setPoint(membershipBrandData.data.point);
        setHistories(membershipBrandData.data.histories);
      } catch (error) {
        console.error("fetchData 함수 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <TopNavigation />
      <Modal
        title={brand}
        basicButtonName="확인"
        basicButtonOnClick={() => navigation(-1)}
      >
        <ScrollWrap>
          <SubTitle>적립포인트</SubTitle>
          {point > 0 ? (
            <PointWrap>{point}p</PointWrap>
          ) : (
            <PointWrap>0p</PointWrap>
          )}
          <SubTitle>최근적립내역</SubTitle>
          <HistoryWrap>
            {histories.length > 0 ? (
              Object.entries(groupDataByDate(histories)).map(
                ([date, dataByDate], index) => (
                  <div key={index}>
                    <CreatedAtWrap>{date}</CreatedAtWrap>
                    {dataByDate.map((data, dataIndex) => (
                      <div
                        key={dataIndex}
                        style={{
                          paddingBottom: "1.17rem",
                          borderBottomColor: "#E0E0E0",
                          borderBottomStyle: "solid",
                          borderBottomWidth: "1px",
                        }}
                      >
                        <TimeWrap>
                          <p>{data.created_at.slice(11, 19)}</p>
                          <p>{data.type}</p>
                        </TimeWrap>
                        <PriceWrap>
                          <p>{data.cur_total}원</p>

                          <p
                            style={{
                              color: "#F25D07",
                            }}
                          >
                            +{data.point}
                          </p>
                        </PriceWrap>
                      </div>
                    ))}
                  </div>
                )
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  padding: "1rem",
                  boxSizing: "border-box",
                }}
              >
                적립 정보가 없습니다
              </div>
            )}
          </HistoryWrap>
        </ScrollWrap>
      </Modal>
    </>
  );
}
