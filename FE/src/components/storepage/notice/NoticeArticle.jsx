import { useState, useEffect } from "react";
import NoticeItem from "./NoticeItem";
import api from "@/api.jsx"; // axios 인스턴스 가져오기

export default function NoticeArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState([]);
  const itemsPerPage = 10;

  // 서버에서 공지사항 데이터를 가져오는 함수
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/api/company/storeinfo/1/notices");
        setNotices(response.data); // 공지사항 데이터 설정
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    fetchNotices();
  }, []);

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-bold">
        <div className="w-1/12 text-center">No</div>
        <div className="w-8/12 text-center">제목</div>
        <div className="w-1/12 text-center">글쓴이</div>
        <div className="w-1/12 text-center">작성시간</div>
        <div className="w-1/12 text-center">조회수</div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      {currentItems.map((data) => (
        <div key={data.noticeId} className="my-5">
          <NoticeItem data={data} />
        </div>
      ))}

      <div className="mt-16 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
