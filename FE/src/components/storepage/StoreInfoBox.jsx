import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dummyData from "@/components/communitypage/CommunityDummy.json";
import CommunityItem from "@/components/communitypage/CommunityItem.jsx";

const StoreContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StoreImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const StoreImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const StoreName = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const StoreInfo = styled.div`
  width: 700px; /* 고정 너비 */
  height: 200px; /* 고정 높이 */
  padding: 10px;
  border: 2px solid #ccc; /* 외곽선 추가 */
  box-sizing: border-box;
  font-size: 16px;
  margin-right: 20px;
  overflow: auto; /* 내용이 넘칠 경우 스크롤 */
`;

const MapPlaceholder = styled.div`
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
`;

const CommunitySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const CommunityTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CommunityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

function StoreInfoBox() {
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(() => {
    setStoreInfo(dummyData);
  }, []);

  return (
    <>
      <StoreContainer>
        <StoreImageWrapper>
          <StoreImage src="../../public/chunsik.png" alt="Store Image" />
          <StoreName>{storeInfo.storeName}</StoreName>
        </StoreImageWrapper>
        <StoreInfo>
          <div>{storeInfo.introduce}</div>
          <div>제품: {storeInfo.product}</div>
          <div>주소: {storeInfo.address}</div>
        </StoreInfo>
        <MapPlaceholder>지도 위치</MapPlaceholder>
      </StoreContainer>

      {/* Community Sections */}
      <CommunitySection>
        <CommunityTitle>업체 공지사항</CommunityTitle>
        <CommunityList>
          {dummyData.slice(0, 3).map((item) => (
            <CommunityItem key={item.id} data={item} />
          ))}
        </CommunityList>
      </CommunitySection>

      <CommunitySection>
        <CommunityTitle>리뷰</CommunityTitle>
        <CommunityList>
          {dummyData.slice(3, 6).map((item) => (
            <CommunityItem key={item.id} data={item} />
          ))}
        </CommunityList>
      </CommunitySection>

      <CommunitySection>
        <CommunityTitle>Q&A</CommunityTitle>
        <CommunityList>
          {dummyData.slice(6, 9).map((item) => (
            <CommunityItem key={item.id} data={item} />
          ))}
        </CommunityList>
      </CommunitySection>
    </>
  );
}

export default StoreInfoBox;
