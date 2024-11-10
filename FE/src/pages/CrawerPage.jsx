import React, { useEffect, useState, useRef } from "react";
import axios from "../api.jsx";

import CrawlingCard from "../components/crawlingpage/CrawlingCard.jsx";

const CrawerPage = () => {
  const [deals, setDeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef(null);

  useEffect(() => {
    // 백엔드에서 500개 제품 크롤링 데이터를 가져오는 함수
    const fetchDeals = async () => {
      try {
        const response = await axios.get("/api/sales/realtime-deals?limit=500");
        setDeals(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) => prevCount + 10);
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-2/3">
      <h1>실시간 딜 목록</h1>
      <ul>
        {deals.length > 0 ? (
          deals
            .slice(0, visibleCount)
            .map((deal, index) => (
              <CrawlingCard key={index} index={index} deal={deal} />
            ))
        ) : (
          <p>실시간 딜 정보를 가져오는 중입니다...</p>
        )}
      </ul>

      <div ref={observerRef} style={{ height: "20px" }}></div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-blue-500 text-white font-bold p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
      >
        Top
      </button>
    </div>
  );
};

export default CrawerPage;
