import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import storeData from "./dummy.json";
import brandOptions from "./brandOptions.json";
import deviceOptions from "./deviceOptions.json";
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

const EditButton = styled.button`
  padding: 8px 16px;
  background-color: #ff9800;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e68900;
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

function CommunitySectionWithPagination({ title, data }) {
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
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStore, setEditedStore] = useState({});

  useEffect(() => {
    setStoreInfos([storeData]);
    setIsOwner(true);
  }, []);

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
      
      // 체크박스 처리: 고유 ID로 검사
      const updatedFeatures = checked
        ? [...(editedStore.supported_features || []), deviceId]
        : editedStore.supported_features.filter((item) => item !== deviceId);
      
      setEditedStore({ ...editedStore, supported_features: updatedFeatures });
    } else {
      setEditedStore({ ...editedStore, [name]: value });
    }
  };

  const handleSaveChanges = () => {
    const updatedStores = storeInfos.map((store) =>
      store.id === editedStore.id ? editedStore : store
    );
    setStoreInfos(updatedStores);
    setIsModalOpen(false);
  };

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
            {isOwner && <EditButton onClick={() => handleEditClick(storeInfo)}>수정</EditButton>}
          </StoreImageWrapper>
          <StoreInfo>
            <div>{storeInfo.description}</div>
            <div>지원 기기: {storeInfo.supported_features.join(", ")}</div>
          </StoreInfo>
          <MapPlaceholder>지도 위치</MapPlaceholder>
        </StoreContainer>
      ))}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={handleModalClose}>X</ModalCloseButton>
            <h3>업체 정보 수정</h3>
            <div>
              <label>업체명: </label>
              <input
                type="text"
                name="name"
                value={editedStore.name}
                onChange={handleInputChange}
                style={{ width: '100%', border: '2px solid #ccc' }}
              />
            </div>
            <div>
              <label>설명: </label>
              <textarea
                name="description"
                value={editedStore.description}
                onChange={handleInputChange}
                style={{ width: '100%', height: '150px', border: '2px solid #ccc' }}
              />
            </div>
            <div>
              <label>업체 선택: </label>
              <select
                name="brand"
                value={editedStore.brand}
                onChange={handleInputChange}
                style={{ width: '100%', border: '2px solid #ccc' }}
              >
                <option value="">업체 선택</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label>기기 선택: </label>
              <div style={{ maxHeight: '100px', overflowY: 'auto', border: '2px solid #ccc', padding: '10px' }}>
                {deviceOptions[editedStore.brand]?.map((device) => {
                  const deviceId = `${editedStore.brand}:${device}`; // 브랜드와 기기를 결합하여 고유 ID 생성
                  return (
                    <div key={deviceId}>
                      <input
                        type="checkbox"
                        name="supported_features"
                        value={deviceId}
                        checked={editedStore.supported_features?.includes(deviceId)}
                        onChange={handleInputChange}
                      />
                      <label>{device}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label>주소: </label>
              <input
                type="text"
                name="address"
                value={editedStore.address}
                onChange={handleInputChange}
                style={{ width: '100%', border: '2px solid #ccc' }}
              />
            </div>
            <div>
              <label>사진 URL: </label>
              <input
                type="text"
                name="logo"
                value={editedStore.logo}
                onChange={handleInputChange}
                style={{ width: '100%', border: '2px solid #ccc' }}
              />
            </div>
            <SaveButton onClick={handleSaveChanges}>저장</SaveButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <CommunitySectionWithPagination title="업체 공지사항" data={CommunityNoticeData} />
      <CommunitySectionWithPagination title="리뷰" data={CommunityReviewData} />
      <CommunitySectionWithPagination title="Q&A" data={CommunityQnAData} />
    </>
  );
}

export default StoreInfoBox;