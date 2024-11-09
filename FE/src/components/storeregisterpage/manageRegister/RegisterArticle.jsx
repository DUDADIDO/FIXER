import { useState, useEffect } from "react";
import RegisterItem from "./RegisterItem";
import api from "@/api.jsx"; // axios 인스턴스 가져오기

export default function RegisterArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [registers, setRegisters] = useState([]); // 데이터 변수명 소문자 R로 변경
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRegisters = async () => {
      try {
        const response = await api.get("/api/application"); // 엔드포인트 수정
        setRegisters(response.data);
      } catch (error) {
        console.error("Error fetching registers:", error);
      }
    };
    fetchRegisters();
  }, []);

  const totalPages = Math.ceil(registers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-bold">
        <div className="w-1/12 text-center">No</div>
        <div className="w-8/12 text-center">제목</div>
        <div className="w-1/12 text-center">작성자</div>
        <div className="w-1/12 text-center">작성시간</div>
        <div className="w-1/12 text-center">조회수</div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      {currentItems.map((data, index) => (
        <div key={data.formId || index} className="my-5">
          <RegisterItem data={data} />
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
