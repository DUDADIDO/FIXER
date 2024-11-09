import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../api";
import NoticeBox from "./notice/NoticeBox";
import ReviewBox from "./reviews/ReviewBox";
import QuestionBox from "./question/QuestionBOx";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 

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

function StoreInfoBox({ companyId }) {
  const [storeInfos, setStoreInfos] = useState([]);
  const [noticeInfos, setNoticeInfos] = useState([]);
  const [questionInfos, setQuestionInfos] = useState([]);
  const [reviewInfos, setReviewInfos] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStore, setEditedStore] = useState({
    supported_features: [],
  });
  const [brands, setBrands] = useState([]);  // API로 가져온 브랜드 옵션 저장
  const [deviceTypes, setDeviceTypes] = useState([]);  // API로 가져온 기기 유형 옵션 저장
  const [selectedDevices, setSelectedDevices] = useState({}); // 브랜드별 선택된 기기 목록 저장
  const [logoUrl, setLogoUrl] = useState({}); //
  // 데이터 가져오기
  useEffect(() => {
    api.get("/api/common-codes/brands")
    .then((response) => {
      setBrands(response.data);  // API 응답으로 설정
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
    });
      api
          .get(`/api/company/storeinfo/${companyId}`) // companyId로 API 호출
          .then((response) => {
              setStoreInfos([response.data]);
              setEditedStore({ 
                ...response.data,
                supported_features: response.data.supported_features || [],
              }); // 기존 선택된 기기 불러오기
              setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
              setLogoUrl([`${apiBaseUrl}${response.data.logo}`]);
          })
          .catch((error) => {
              console.error("Error fetching store info:", error);
          });

        api //공지사항 API 호출
          .get(`/api/company/storeinfo/${companyId}/notices`) // companyId로 API 호출
          .then((response) => {
              setNoticeInfos(response.data);
              setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
          })
          .catch((error) => {
              console.error("Error fetching store info:", error);
          });


        const handleEditClick = (storeInfo) => {
            setEditedStore({ ...storeInfo });
            setIsModalOpen(true);
          };


          api //리뷰 API 호출
          .get(`/api/company/storeinfo/${companyId}/reviews`) // companyId로 API 호출
          .then((response) => {
              setReviewInfos(response.data);
              setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
          })
          .catch((error) => {
              console.error("Error fetching store info:", error);
          });     

          api //qna API 호출
          .get(`/api/company/storeinfo/${companyId}/questions`) // companyId로 API 호출
          .then((response) => {
              setQuestionInfos(response.data);
              setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
          })
          .catch((error) => {
              console.error("Error fetching store info:", error);
          });     
  }, [companyId]); // companyId 변경 시 useEffect 재실행



  const handleEditClick = (storeInfo) => {
    setEditedStore({...storeInfo});
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setEditedStore({ ...editedStore, brand: brandId, supported_features: [] });

    // 선택된 브랜드에 맞는 기기 유형을 가져옵니다.
    if (brandId) {
      api.get(`/api/common-codes/device-types-by-brand/${brandId}`)
        .then((response) => {
          setDeviceTypes(response.data); // 해당 브랜드의 기기 유형 목록 저장
        })
        .catch((error) => {
          console.error("Error fetching device types:", error);
        });
    } else {
      setDeviceTypes([]); // 브랜드가 선택되지 않은 경우, 기기 목록을 초기화
    }
  };
  // 기기 선택 시 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const brandId = editedStore.brand;

    // 선택된 기기 목록 관리
    setSelectedDevices((prevSelectedDevices) => {
      const updatedDevices = { ...prevSelectedDevices };
      if (!updatedDevices[brandId]) {
        updatedDevices[brandId] = [];
      }

      if (type === "checkbox") {
        if (checked) {
          updatedDevices[brandId] = [...updatedDevices[brandId], value];
        } else {
          updatedDevices[brandId] = updatedDevices[brandId].filter(
            (item) => item !== value
          );
        }
      }
      return updatedDevices;
    });
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
            <StoreImage src={logoUrl} alt="Store Logo" />
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
            <div>{storeInfo.content}</div>
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
              <label className="block text-gray-700 mb-2">검색 창 설명:</label>
              <textarea
                name="description"
                value={editedStore.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">설명:</label>
              <textarea
                name="content"
                value={editedStore.content}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="2"
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
  {/* 브랜드 선택 */}
  <div className="mb-4">
        <label>브랜드 선택:</label>
        <select
          name="brand"
          value={editedStore.brand || ""}
          onChange={handleBrandChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">브랜드 선택</option>
          {brands.map((brand) => (
            <option key={brand.codeId} value={brand.codeId}>
              {brand.codeName}
            </option>
          ))}
        </select>
      </div>

      {/* 브랜드 선택 시 해당 기기 유형만 표시 */}
      {editedStore.brand && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">기기 선택:</label>
          <div className="max-h-24 overflow-y-auto border border-gray-300 p-2 rounded">
            {deviceTypes.map((device) => {
              const deviceId = `${editedStore.brand}:${device.codeId}`;
              return (
                <div key={deviceId} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="supported_features"
                    value={deviceId}
                    checked={selectedDevices[editedStore.brand]?.includes(deviceId) || false}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <label className="text-gray-700">{device.codeName}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}

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

      <NoticeBox
        title="업체 공지사항"
        data={noticeInfos}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
      <ReviewBox
        title="리뷰"
        data={reviewInfos}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
      <QuestionBox
        title="Q&A"
        data={questionInfos}
        storeId={storeInfos[0]?.company_id}
        storeName={storeInfos[0]?.name}
      />
    </>
  );
}

export default StoreInfoBox;