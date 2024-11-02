import { useState, useEffect } from "react";

import CommunityItem from "@/components/communitypage/CommunityItem.jsx";

import CommunityDummy from "@/components/communitypage/CommunityDummy.json";

const dummy = CommunityDummy;

export default function CommunityArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(dummy.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummy.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
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
        <div key={data.id} className="my-5">
          <CommunityItem data={data} />
        </div>
      ))}

      <div className="mt-16 flex justify-center items-center space-x-2">
        {/* Prev 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg
      ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
      }
    `}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* 페이지 번호 버튼 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg
        ${
          currentPage === index + 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
        }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`text-sm font-semibold py-1 px-3 mx-1 rounded-lg transition-all duration-300 shadow-lg
      ${
        currentPage === totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
      }
    `}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
