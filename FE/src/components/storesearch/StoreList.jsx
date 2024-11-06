import { useState, useEffect, useCallback, useRef } from "react";
import StoreInfoCard from "./StoreInfoCard.jsx";
import api from "../../api.jsx";

export default function StoreList() {
  const [stores, setStores] = useState([]); // 상점 목록
  const [pageSize] = useState(10); // 페이지 크기
  const [lastId, setLastId] = useState(null); // 마지막 ID 추적
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
  const [loading, setLoading] = useState(false);

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
      const newStores = response.data.companies || []; // 데이터가 없으면 빈 배열로 처리

      setStores((prevStores) => [...prevStores, ...newStores]);
      setLastId(newStores.length > 0 ? newStores[newStores.length - 1].company_id : null);
      setHasMore(response.data.isNext);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
    setLoading(false);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="flex flex-col min-w-full min-h-full p-4 space-y-4">
      <div className="flex flex-wrap w-full">
        {stores.map((store, index) => (
          <div
            key={store.company_id}
            className="w-1/2 p-2"
            ref={stores.length === index + 1 ? lastStoreRef : null}
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
