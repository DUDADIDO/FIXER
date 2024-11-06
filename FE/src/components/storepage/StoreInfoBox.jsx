import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";
import styled from "styled-components";
import storeData from "./dummy.json";
import brandOptions from "./brandOptions.json";
import deviceOptions from "./deviceOptions.json";
import CommunityItem from "@/components/communitypage/CommunityItem.jsx";
import CommunityNoticeData from "@/components/communitypage/CommunityNoticeDummy.json";
import CommunityReviewData from "@/components/communitypage/CommunityReviewDummy.json";
import CommunityQnAData from "@/components/communitypage/CommunityQnADummy.json";
import axios from "axios";
import api from "../../api";

const StoreContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px;
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
  width: 700px;
  height: 200px;
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
  margin-bottom: 40px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled(Link)`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 700px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalCloseButton = styled.button`
  background: #ff5c5c;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  float: right;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #03c75a;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #028a3d;
  }
`;


function CommunitySectionWithPagination({ title, data, storeId, storeName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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
      <ButtonContainer>
      <WriteButton
        to={{
          pathname:
            title === "리뷰"
              ? `/storeinfo/${storeId}/writereview`
              : title === "업체 공지사항"
              ? `/storeinfo/${storeId}/writenotice`
              : `/storeinfo/${storeId}/writeqna`,
        }}
        state={{ storeId, storeName }}
      >
        글쓰기
      </WriteButton>
      </ButtonContainer>
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

function StoreInfoBox({ companyId }) {
  const [storeInfos, setStoreInfos] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStore, setEditedStore] = useState({});

  // 데이터 가져오기
  useEffect(() => {
      api
          .get(`/api/company/storeinfo/${companyId}`) // companyId로 API 호출
          .then((response) => {
              setStoreInfos([response.data]);
              setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
          })
          .catch((error) => {
              console.error("Error fetching store info:", error);
          });
  }, [companyId]); // companyId 변경 시 useEffect 재실행

  const handleEditClick = (storeInfo) => {
    setEditedStore(storeInfo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const [brand, device] = value.split(":");
      const deviceId = `${brand}:${device}`;
      const updatedFeatures = checked
        ? [...(editedStore.supported_features || []), deviceId]
        : editedStore.supported_features.filter((item) => item !== deviceId);

      setEditedStore({ ...editedStore, supported_features: updatedFeatures });
    } else {
      setEditedStore({ ...editedStore, [name]: value });
    }
  };

  // 저장 버튼 클릭 시
  const handleSaveChanges = () => {
    api
      .post("/api/company/storeinfo/update", editedStore)
      .then((response) => {
        setStoreInfos((prevInfos) =>
          prevInfos.map((store) =>
            store.company_id === editedStore.company_id ? response.data : store
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating store info:", error);
      });
  };

  return (
    <>
      {storeInfos.map((storeInfo) => (
        <StoreContainer key={storeInfo.company_id}>
          <StoreImageWrapper>
            <StoreImage src={storeInfo.logo} alt="Store Logo" />
            <StoreName>{storeInfo.name}</StoreName>
            <StoreStats className="flex flex-col gap-2">
              <div className="flex gap-4">
                <div>수리 횟수: {storeInfo.repair_count}</div>
                <div>평점: {storeInfo.score}</div>
                <div>리뷰 수: {storeInfo.review_cnt}</div>
              </div>
              <div>전화번호: {storeInfo.phone}</div> {/* 전화번호는 아래 줄에 출력 */}
              <div>주소: {storeInfo.location}</div>
            </StoreStats>
            {isOwner && (
              <button
                onClick={() => handleEditClick(storeInfo)}
                className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-600"
              >
                수정
              </button>
            )}
          </StoreImageWrapper>
          <StoreInfo>
            <div>{storeInfo.description}</div>
            <div>지원 기기: {storeInfo.supported_features?.join(", ")}</div>
          </StoreInfo>
          <MapPlaceholder>지도 위치</MapPlaceholder>
        </StoreContainer>
      ))}

{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[700px] bg-white p-8 rounded-lg shadow-lg">
            <button 
              onClick={handleModalClose} 
              className="bg-red-500 text-white px-4 py-2 rounded float-right">
              X
            </button>
            <h3 className="text-lg font-bold mb-4">업체 정보 수정</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">업체명:</label>
              <input
                type="text"
                name="name"
                value={editedStore.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">설명:</label>
              <textarea
                name="description"
                value={editedStore.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">주소:</label>
              <input
                type="text"
                name="location"
                value={editedStore.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">휴대폰 번호:</label>
              <input
                type="text"
                name="phone"
                value={editedStore.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">업체 선택:</label>
              <select
                name="brand"
                value={editedStore.brand || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">업체 선택</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">기기 선택:</label>
              <div className="max-h-24 overflow-y-auto border border-gray-300 p-2 rounded">
                {deviceOptions[editedStore.brand]?.map((device) => {
                  const deviceId = `${editedStore.brand}:${device}`;
                  return (
                    <div key={deviceId} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="supported_features"
                        value={deviceId}
                        checked={editedStore.supported_features?.includes(deviceId) || false}
                        onChange={handleInputChange}
                        className="form-checkbox"
                      />
                      <label className="text-gray-700">{device}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">사진 경로:</label>
              <input
                type="text"
                name="logo"
                value={editedStore.logo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            
            <button
              onClick={handleSaveChanges}
              className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition"
            >
              저장
            </button>
          </div>
        </div>
      )}

      <CommunitySectionWithPagination
        title="업체 공지사항"
        data={CommunityNoticeData}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
      <CommunitySectionWithPagination
        title="리뷰"
        data={CommunityReviewData}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
      <CommunitySectionWithPagination
        title="Q&A"
        data={CommunityQnAData}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
    </>
  );
}

export default StoreInfoBox;