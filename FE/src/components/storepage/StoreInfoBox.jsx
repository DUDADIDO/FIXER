import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../api";
import NoticeBox from "./notice/NoticeBox";
import ReviewBox from "./reviews/ReviewBox";
import QuestionBox from "./question/QuestionBox";
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
const PaymentLink = styled(Link)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #03c75a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;

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
    name: "",
    location: "",
    phone: "",
    description: "",
    content: "",
    supported_features: [],
  });
  const [deviceTypes, setDeviceTypes] = useState([]); 
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const myStore = localStorage.getItem("myStore");
    const userType = localStorage.getItem("userType");

    setIsOwner(myStore === companyId.toString() || userType === '1');

    api.get("/api/common-codes/brand-device-types")
      .then((response) => {
        setDeviceTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brand-device types:", error);
      });

    api.get(`/api/company/${companyId}/supported-devices`)
      .then((response) => {
        const initialSelectedDevices = response.data.map(device => device.brandDeviceMapId);
        setSelectedDevices(initialSelectedDevices);
      })
      .catch((error) => {
        console.error("Error fetching supported devices:", error);
      });

    api.get(`/api/company/storeinfo/${companyId}`)
      .then((response) => {
        setStoreInfos([response.data]);
        setEditedStore({
          name: response.data.name,
          location: response.data.location,
          phone: response.data.phone,
          description: response.data.description,
          content: response.data.content,
          supported_features: response.data.supported_features || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching store info:", error);
      });

    api.get(`/api/company/storeinfo/${companyId}/notices`)
      .then((response) => {
        setNoticeInfos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });

    api.get(`/api/company/storeinfo/${companyId}/reviews`)
      .then((response) => {
        setReviewInfos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

    api.get(`/api/company/storeinfo/${companyId}/questions`)
      .then((response) => {
        setQuestionInfos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [companyId]);

  const renderSupportedDevices = () => {
    // 기기 목록 필터링 및 브랜드별 그룹화
    const supportedDevices = deviceTypes.filter((device) => selectedDevices.includes(device.brandDeviceMapId));
    const brandGroups = supportedDevices.reduce((acc, device) => {
      if (!acc[device.brandName]) acc[device.brandName] = [];
      acc[device.brandName].push(device.deviceTypeName);
      return acc;
    }, {});

    return (
      <div>
        <h4>지원 기기:</h4>
        {Object.entries(brandGroups).map(([brand, devices]) => (
          <div key={brand}>
            <strong>{brand}</strong>: {devices.join(", ")}
          </div>
        ))}
      </div>
    );
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
  };

  const handleDeviceChange = (e) => {
    const deviceId = parseInt(e.target.value);
    setSelectedDevices((prev) =>
      e.target.checked
        ? [...prev, deviceId]
        : prev.filter((id) => id !== deviceId)
    );
  };

  const handleSaveChanges = () => {
    const supportedDeviceIds = selectedDevices;
  
    const formData = new FormData();
    // `companyDTO`를 JSON으로 보내면서 Content-Type을 지정
    const companyDTOBlob = new Blob([JSON.stringify(editedStore)], {
      type: "application/json",
    });
    formData.append("companyDTO", companyDTOBlob);
  
    // `supportedDeviceIds`를 JSON으로 보내면서 Content-Type을 지정
    const supportedDeviceIdsBlob = new Blob([JSON.stringify(supportedDeviceIds)], {
      type: "application/json",
    });
    formData.append("supportedDeviceIds", supportedDeviceIdsBlob);
  
    // 파일이 선택된 경우 추가
    if (logoFile) {
      formData.append("logoFile", logoFile);
    }
  
    // 디버그용 출력
    for (const x of formData.entries()) {
      console.log(x);
    };
  
    // 헤더를 생략해서 axios가 Content-Type을 자동으로 설정하게 함
    api.post(`/api/company/storeinfo/${companyId}/update`, formData)
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
            <StoreImage src={`${apiBaseUrl}${storeInfo.logo}`} alt="Store Logo" />
            <StoreName>{storeInfo.name}</StoreName>
            <StoreStats className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <div>수리 횟수: {storeInfo.repair_count}</div>
              <div>평점: {storeInfo.score}</div>
              <div>리뷰 수: {storeInfo.review_cnt}</div>
            </StoreStats>
            <div className="mt-2 text-sm text-gray-700">
              전화번호: {storeInfo.phone}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              주소: {storeInfo.location}
            </div>

            {isOwner && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-600"
              >
                수정
              </button>
            )}
          </StoreImageWrapper>
          <StoreInfo>
            <div>{storeInfo.content}</div>
            {renderSupportedDevices()}
          </StoreInfo>
          <div>
            <MapPlaceholder>지도 위치</MapPlaceholder>
            <PaymentLink
              to={{
                pathname: `/storeinfo/${companyId}/payment`,
              }}
              state={{
                storeId: companyId,
                storeName: storeInfo.name,
              }}
              style={{ display: "block", marginTop: "10px", textAlign: "center" }} // 스타일 추가
            >
              결제하기
            </PaymentLink>
          </div>
        </StoreContainer>
      ))} 

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[700px] bg-white p-8 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded float-right"
            >
              X
            </button>
            <h3 className="text-lg font-bold mb-4">업체 정보 수정</h3>
            
            {/* Name field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">업체명:</label>
              <input
                type="text"
                name="name"
                value={editedStore.name}
                onChange={(e) => setEditedStore({ ...editedStore, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Location field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">주소:</label>
              <input
                type="text"
                name="location"
                value={editedStore.location}
                onChange={(e) => setEditedStore({ ...editedStore, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Phone field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">전화번호:</label>
              <input
                type="text"
                name="phone"
                value={editedStore.phone}
                onChange={(e) => setEditedStore({ ...editedStore, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Description field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">회사 설명:</label>
              <textarea
                name="description"
                value={editedStore.description}
                onChange={(e) => setEditedStore({ ...editedStore, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            </div>

            {/* Content field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">회사 콘텐츠:</label>
              <textarea
                name="content"
                value={editedStore.content}
                onChange={(e) => setEditedStore({ ...editedStore, content: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            </div>

            {/* 브랜드 선택 */}
            <div className="mb-4">
              <label>브랜드 선택:</label>
              <select onChange={handleBrandChange} value={selectedBrand || ""} className="w-full p-2 border border-gray-300 rounded">
                <option value="">브랜드 선택</option>
                {Array.from(new Set(deviceTypes.map((device) => device.brandId))).map((brandId) => {
                  const brand = deviceTypes.find((device) => device.brandId === brandId);
                  return (
                    <option key={brandId} value={brandId}>
                      {brand.brandName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 기기 선택 */}
            {selectedBrand && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">지원 기기 선택:</label>
                <div className="max-h-24 overflow-y-auto border border-gray-300 p-2 rounded">
                  {deviceTypes
                    .filter((device) => device.brandId === parseInt(selectedBrand))
                    .map((device) => (
                      <div key={device.brandDeviceMapId} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={device.brandDeviceMapId}
                          checked={selectedDevices.includes(device.brandDeviceMapId)}
                          onChange={handleDeviceChange}
                          className="form-checkbox"
                        />
                        <label className="text-gray-700">{device.deviceTypeName}</label>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 로고 파일 업로드 */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">로고 파일:</label>
              <input
                type="file"
                name="logoFile"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button onClick={handleSaveChanges} className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition">
              저장
            </button>
          </div>
        </div>
      )}


      <NoticeBox title="업체 공지사항" data={noticeInfos} storeId={storeInfos[0]?.company_id} storeName={storeInfos[0]?.name} />
      <ReviewBox title="리뷰" data={reviewInfos} storeId={storeInfos[0]?.company_id} storeName={storeInfos[0]?.name} />
      <QuestionBox title="Q&A" data={questionInfos} storeId={storeInfos[0]?.company_id} storeName={storeInfos[0]?.name} />
    </>
  );
}

export default StoreInfoBox;