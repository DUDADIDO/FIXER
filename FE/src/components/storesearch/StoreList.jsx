import { useState, useEffect } from "react";

import StoreInfoCard from "./StoreInfoCard.jsx";
import chunsik from "../../../public/chunsik.png";

const dummy = [
  {
    id: 1,
    name: "ABC 수리센터",
    description:
      "저희 업체는 신속하고 믿을 수 있는 서비스를 제공하고 있습니다. 모든 전자기기를 완벽하게 수리해드립니다.",
    supported_features: ["삼성 노트북", "갤럭시", "LG 노트북"],
    repair_count: 180,
    score: 4.3,
    review_cnt: 25,
    logo: chunsik,
  },
  {
    id: 2,
    name: "수리천국",
    description:
      "저렴한 가격과 뛰어난 기술로 최고의 수리 서비스를 제공하는 수리천국입니다.",
    supported_features: ["애플 맥북", "갤럭시 탭", "델 노트북"],
    repair_count: 150,
    score: 4.5,
    review_cnt: 30,
    logo: chunsik,
  },
  {
    id: 3,
    name: "고객만족 수리점",
    description: "고객 만족을 최우선으로 생각하는 수리점입니다. 믿고 맡기세요.",
    supported_features: ["레노버 노트북", "삼성 갤럭시", "LG 모니터"],
    repair_count: 220,
    score: 4.1,
    review_cnt: 18,
    logo: chunsik,
  },
  {
    id: 4,
    name: "테크닥터",
    description:
      "기술력으로 승부하는 테크닥터! 모든 기기를 빠르게 복구해드립니다.",
    supported_features: ["소니 바이오", "삼성 노트북", "갤럭시 폰"],
    repair_count: 195,
    score: 4.4,
    review_cnt: 22,
    logo: chunsik,
  },
  {
    id: 5,
    name: "수리마스터",
    description:
      "수리에 있어서만큼은 우리가 최고! 친절하고 신뢰할 수 있는 서비스를 제공합니다.",
    supported_features: ["에이서 노트북", "아이폰", "MS 서피스"],
    repair_count: 210,
    score: 4.2,
    review_cnt: 19,
    logo: chunsik,
  },
  {
    id: 6,
    name: "프로수리센터",
    description:
      "프로답게 꼼꼼하게 수리해드립니다. 전문 수리센터 프로수리센터입니다.",
    supported_features: ["LG 그램", "삼성 갤럭시", "HP 노트북"],
    repair_count: 240,
    score: 4.6,
    review_cnt: 35,
    logo: chunsik,
  },
  {
    id: 7,
    name: "기기천재",
    description:
      "모든 전자기기를 완벽하게 수리해드립니다. 신뢰할 수 있는 기기천재입니다.",
    supported_features: ["갤럭시 노트북", "애플 아이패드", "델 모니터"],
    repair_count: 165,
    score: 4.3,
    review_cnt: 28,
    logo: chunsik,
  },
  {
    id: 8,
    name: "노트북 메카닉스",
    description: "노트북 수리 전문 메카닉스입니다. 빠르고 정확하게 수리합니다.",
    supported_features: ["MS 서피스", "애플 맥북", "삼성 노트북"],
    repair_count: 230,
    score: 4.7,
    review_cnt: 32,
    logo: chunsik,
  },
];

export default function StoreList() {
  const [searchType, setSearchType] = useState("name"); // 검색 타입: "name" 또는 "feature"
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("score"); // 정렬 타입: "score", "repair_count", "review_cnt"
  const [filteredStores, setFilteredStores] = useState(dummy);

  useEffect(() => {
    let filtered = dummy;

    // 검색 필터링
    if (searchKeyword !== "") {
      if (searchType === "name") {
        filtered = filtered.filter((store) =>
          store.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      } else if (searchType === "feature") {
        filtered = filtered.filter((store) =>
          store.supported_features.some((feature) =>
            feature.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        );
      }
    }

    // 정렬 적용
    if (sortType === "score") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortType === "repair_count") {
      filtered.sort((a, b) => b.repair_count - a.repair_count);
    } else if (sortType === "review_cnt") {
      filtered.sort((a, b) => b.review_cnt - a.review_cnt);
    }

    setFilteredStores([...filtered]);
  }, [searchKeyword, searchType, sortType]);

  return (
    <div className="flex flex-col min-w-full min-h-full p-4 space-y-4">
      {/* 검색 타입 선택 드롭박스 */}
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

        {/* 검색 입력 필드 */}
        <div className="flex-grow mb-4">
          <input
            type="text"
            placeholder={
              searchType === "name"
                ? "가게 이름을 입력하세요..."
                : "수리 품목을 입력하세요..."
            }
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* 정렬 옵션 선택 드롭박스 */}
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

      {/* 검색 결과가 없을 때 표시할 메시지 */}
      {filteredStores.length === 0 ? (
        <div className="flex items-center justify-center w-full h-screen border border-gray-300 rounded-md">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="flex flex-wrap w-full">
          {filteredStores.map((store) => (
            <div key={store.id} className="w-1/2 p-2">
              <StoreInfoCard data={store} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
