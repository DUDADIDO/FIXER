import { useState, useEffect, useCallback, useRef } from "react";
import StoreInfoCard from "./StoreInfoCard.jsx";
import api from "../../api.jsx";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [pageSize] = useState(10);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchType, setSearchType] = useState("name");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("score");

  const observer = useRef();

  const lastStoreRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchStores();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

   // 데이터를 가져오는 함수
   const fetchStores = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await api.get("/api/company/storesearch", {
        params: { pageSize, lastId },
      });
      const newStores = response.data.companies || [];
  
      // 기존 stores의 company_id들을 Set에 저장하여 중복 제거
      const existingIds = new Set(stores.map((store) => store.company_id));
  
      // 중복되지 않는 상점만 필터링하여 추가
      const uniqueStores = newStores.filter(
        (newStore) => !existingIds.has(newStore.company_id)
      );
  
      setStores((prevStores) => {
        // 중복되지 않도록 추가된 기존 stores + newStores
        const combinedStores = [...prevStores, ...uniqueStores];
        return combinedStores.filter((store, index, self) => 
          index === self.findIndex((s) => s.company_id === store.company_id)
        );
      });
  
      // lastId 업데이트
      setLastId(newStores.length > 0 ? newStores[newStores.length - 1].company_id : null);
      setHasMore(response.data.isNext);
  
      // 각 상점에 대해 수리 가능한 기기를 추가로 조회
      for (const store of uniqueStores) {
        const supportedDevices = await fetchSupportedDevices(store.company_id);
        setStores((prevStores) =>
          prevStores.map((s) =>
            s.company_id === store.company_id ? { ...s, supportedDevices } : s
          )
        );
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
    setLoading(false);
  };

  const fetchSupportedDevices = async (companyId) => {
    try {
      const response = await api.get(`/api/company/${companyId}/supported-devices`);
      const supportedDevices = response.data;
      const commonCodesResponse = await api.get(`/api/common-codes/brand-device-types`);
      const brandDeviceTypes = commonCodesResponse.data;
      return supportedDevices.map((device) => {
        const matchingDevice = brandDeviceTypes.find((type) => type.brandDeviceMapId === device.brandDeviceMapId);
        return matchingDevice
          ? { ...device, brandName: matchingDevice.brandName, deviceTypeName: matchingDevice.deviceTypeName }
          : device;
      });
    } catch (error) {
      console.error("Error fetching supported devices:", error);
      return [];
    }
  };

  useEffect(() => {
    let filtered = [...stores];
    if (searchKeyword !== "") {
      filtered = filtered.filter((store) => {
        if (searchType === "name") {
          return store.name.toLowerCase().includes(searchKeyword.toLowerCase());
        } else if (searchType === "feature") {
          if (!store.supportedDevices || store.supportedDevices.length === 0) {
            return false;
          }
          return store.supportedDevices.some((device) => {
            const combinedInfo = `${device.brandName} ${device.deviceTypeName}`.toLowerCase();
            return combinedInfo.includes(searchKeyword.toLowerCase());
          });
        }
        return true;
      });
    }

    if (sortType === "score") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortType === "repair_count") {
      filtered.sort((a, b) => b.repair_count - a.repair_count);
    } else if (sortType === "review_cnt") {
      filtered.sort((a, b) => b.review_cnt - a.review_cnt);
    }

    setFilteredStores(filtered);
  }, [stores, searchKeyword, searchType, sortType]);

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="flex flex-col w-full p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">상점 목록</h1>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1/6">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="name">가게 이름</option>
            <option value="feature">수리 품목</option>
          </select>
        </div>

        <div className="flex-grow">
          <input
            type="text"
            placeholder={searchType === "name" ? "가게 이름을 입력하세요..." : "수리 품목을 입력하세요..."}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-1/6">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="score">평점순</option>
            <option value="repair_count">수리 횟수순</option>
            <option value="review_cnt">리뷰 개수순</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        {filteredStores.map((store, index) => (
          <div
            key={`${store.company_id}-${index}`}
            className="w-1/2 px-2 pb-4"
            ref={filteredStores.length === index + 1 ? lastStoreRef : null}
          >
            <StoreInfoCard data={store} supportedDevices={store.supportedDevices} />
          </div>
        ))}
      </div>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {!hasMore && <p className="text-center text-gray-500">모든 데이터를 로드했습니다.</p>}
    </div>
  );
}
