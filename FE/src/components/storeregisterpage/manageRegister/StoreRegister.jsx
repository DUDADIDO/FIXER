import { useState } from "react";
import api from "@/api"

export default function StoreRegister() {
  const [excelFile, setExcelFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleLogoFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!excelFile || !logoFile) {
      alert("신청서와 zip 파일을 모두 첨부해주세요.");
      return;
    }

    // user_num을 localStorage에서 가져옴
    const userNum = localStorage.getItem("userNum");

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("user_num", userNum); // user_num 추가
    formData.append("excelFile", excelFile); // 신청서 파일 추가
    formData.append("logoFile", logoFile); // zip 파일 추가

    try {
      const response = await api.post("/api/company/storeregister", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드를 위해 필요
        },
      });
      if (response.status === 200) {
        alert("업체 등록이 완료되었습니다.");
      }
    } catch (error) {
      console.error("업체 등록 신청 중 오류 발생:", error);
      alert("업체 등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full min-h-[80vh] p-8 space-y-12 bg-slate-300">
      <h1 className="text-2xl font-bold">관리자 업체 등록 페이지</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* 신청서 파일 첨부 */}
        <div className="flex flex-col w-full hover:cursor-pointer">
          <label htmlFor="applicationForm" className="mb-2 font-semibold">
            스토어 엑셀 파일
          </label>
          <input
            type="file"
            id="excelFile"
            accept=".xlsx"
            onChange={handleExcelFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {excelFile && <p className="mt-2 text-gray-700">첨부된 신청서: {excelFile.name}</p>}
        </div>

        {/* zip 파일 첨부 */}
        <div className="flex flex-col w-full hover:cursor-pointer">
          <label htmlFor="logoFile" className="mb-2 font-semibold">
            스토어 로고 파일
          </label>
          <input
            type="file"
            id="logoFile"
            accept=".jpg, .png, .webp, .gif, .ico, .jpeg"
            onChange={handleLogoFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {logoFile && <p className="mt-2 text-gray-700">첨부된 zip 파일: {logoFile.name}</p>}
        </div>

        {/* 제출 버튼 */}
        <div className="w-full mt-8 flex justify-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            신청서 제출
          </button>
        </div>
      </form>
    </div>
  );
}
