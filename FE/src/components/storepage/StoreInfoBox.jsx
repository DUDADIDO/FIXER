import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import storeData from "./dummy.json";
import CommunityItem from "@/components/communitypage/CommunityItem.jsx";
import CommunityNoticeData from "@/components/communitypage/CommunityNoticeDummy.json";
import CommunityReviewData from "@/components/communitypage/CommunityReviewDummy.json";
import CommunityQnAData from "@/components/communitypage/CommunityQnADummy.json";

const StoreContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px; /* 아래쪽 마진 추가 */
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
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const StoreStats = styled.div`
  display: flex;
  font-size: 12px;
  gap: 10px;
  margin-bottom: 10px;
`;

const StoreInfo = styled.div`
  height: 200px; /* 지도의 높이와 동일하게 맞춤 */
  padding: 10px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
  margin-right: 20px;
  overflow: auto;
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
  margin-left: 20px;
`;

const CommunitySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px; /* 위아래 마진 추가 */
  padding: 10px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  overflow: hidden;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "#03c75a" : "#f9f9f9")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const WriteButton = styled(Link)`
  align-self: flex-end;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #03c75a;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #028a3d;
  }
`;

function CommunitySectionWithPagination({ title, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 현재 페이지에 맞는 데이터 계산
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <CommunitySection>
      <CommunityTitle>{title}</CommunityTitle>
      <WriteButton to="">글쓰기</WriteButton>
      <CommunityList>
        {currentItems.map((item) => (
          <CommunityItem key={item.id} data={item} />
        ))}
      </CommunityList>
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PageButton>
      </Pagination>
    </CommunitySection>
  );
}

function StoreInfoBox() {
  const [storeInfos, setStoreInfos] = useState([]);

  useEffect(() => {
    setStoreInfos([storeData]);
  }, []);

  return (
    <>
      {storeInfos.map((storeInfo) => (
        <StoreContainer key={storeInfo.id}>
          <StoreImageWrapper>
            <StoreImage src={storeInfo.logo} alt="Store Logo" />
            <StoreName>{storeInfo.name}</StoreName>
            <StoreStats>
              <div>수리 횟수: {storeInfo.repair_count}</div>
              <div>평점: {storeInfo.score}</div>
              <div>리뷰 수: {storeInfo.review_cnt}</div>
            </StoreStats>
          </StoreImageWrapper>
          <StoreInfo>
            <div>{storeInfo.description}</div>
            <div>지원 기기: {storeInfo.supported_features.join(", ")}</div>
          </StoreInfo>
          <MapPlaceholder>지도 위치</MapPlaceholder>
        </StoreContainer>
      ))}

      {/* Community Sections with Pagination */}
      <CommunitySectionWithPagination
        title="업체 공지사항"
        data={CommunityNoticeData}
      />
      <CommunitySectionWithPagination title="리뷰" data={CommunityReviewData} />
      <CommunitySectionWithPagination title="Q&A" data={CommunityQnAData} />
    </>
  );
}

export default StoreInfoBox;