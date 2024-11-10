import React, { useState } from "react";
import styled from "styled-components";
import CommunityItem from "./userinfoContent/CommunityItem";
import ReviewItem from "./userinfoContent/ReviewItem";

const CommunitySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
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
  width: 100%;
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
  background-color: ${(props) => (props.$active ? "#03c75a" : "#f9f9f9")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function CommunitySectionWithPagination({ title, data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
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
      <CommunityList>
        {title === "내가 쓴 QnA"
          ? currentItems.map((item) => (
              <CommunityItem key={item.index} data={item} />
            ))
          : currentItems.map((item) => (
              <ReviewItem key={item.index} data={item} />
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
            $active={currentPage === index + 1}
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

export default CommunitySectionWithPagination;
