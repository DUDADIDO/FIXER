import { useState, useEffect, useCallback, useRef } from "react";
import StoreInfoCard from "./StoreInfoCard.jsx";
import api from "../../api.jsx";

export default function StoreList() {
  const [stores, setStores] = useState([]); // 전체 상점 목록
  const [filteredStores, setFilteredStores] = useState([]); // 필터링된 상점 목록
  const [pageSize] = useState(10); // 페이지 크기
  const [lastId, setLastId] = useState(null); // 마지막 ID 추적
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터 여부
  const [loading, setLoading] = useState(false);

  // 검색 및 정렬 관련 상태값
  const [searchType, setSearchType] = useState("name");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("score");

  const observer = useRef(); // 관찰 대상 참조

  // Intersection Observer 핸들러
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
      
      // 중복된 상점을 필터링하여 추가
      setStores((prevStores) => {
        const allStores = [...prevStores, ...newStores];
        const uniqueStores = allStores.filter(
          (store, index, self) =>
            index === self.findIndex((s) => s.company_id === store.company_id)
        );
        return uniqueStores;
      });
      
      setLastId(newStores.length > 0 ? newStores[newStores.length - 1].company_id : null);
      setHasMore(response.data.isNext);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
    setLoading(false);
  };

  // 검색 및 정렬 기능 적용
  useEffect(() => {
    let filtered = [...stores];
    
    // 검색 필터링
    if (searchKeyword !== "") {
      filtered = filtered.filter((store) => {
        if (searchType === "name") {
          return store.name.toLowerCase().includes(searchKeyword.toLowerCase());
        } else if (searchType === "feature") {
          return store.supported_features.some((feature) =>
            feature.toLowerCase().includes(searchKeyword.toLowerCase())
          );
        }
        return true;
      });
    }

    // 정렬 적용
    if (sortType === "score") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortType === "repair_count") {
      filtered.sort((a, b) => b.repair_count - a.repair_count);
    } else if (sortType === "review_cnt") {
      filtered.sort((a, b) => b.review_cnt - a.review_cnt);
    }

    setFilteredStores(filtered);
  }, [stores, searchKeyword, searchType, sortType]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="flex flex-col min-w-full min-h-full p-4 space-y-4">
      {/* 검색 및 정렬 UI */}
      <div className="flex items-center gap-4">
        <div className="w-1/12 mb-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="name">가게 이름</option>
            <option value="feature">수리 품목</option>
          </select>
        </div>

        <div className="flex-grow mb-4">
          <input
            type="text"
            placeholder={
              searchType === "name" ? "가게 이름을 입력하세요..." : "수리 품목을 입력하세요..."
            }
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-1/12 mb-4">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="score">평점순</option>
            <option value="repair_count">수리 횟수순</option>
            <option value="review_cnt">리뷰 개수순</option>
          </select>
        </div>
      </div>

      {/* 필터링된 상점 목록 표시 */}
      <div className="flex flex-wrap w-full">
        {filteredStores.map((store, index) => (
          <div
            key={store.company_id}
            className="w-1/2 p-2"
            ref={filteredStores.length === index + 1 ? lastStoreRef : null}
          >
            <StoreInfoCard data={store} />
          </div>
        ))}
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {!hasMore && <p className="text-center">모든 데이터를 로드했습니다.</p>}
    </div>
  );
}
