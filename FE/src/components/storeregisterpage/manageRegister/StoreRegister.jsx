import { useState } from "react";
import api from "@/api";

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
      alert("엑셀 파일과 로고 파일을 모두 첨부해주세요.");
      return;
    }

    const userNum = localStorage.getItem("userNum");

    const formData = new FormData();
    formData.append("user_num", userNum);
    formData.append("excelFile", excelFile);
    formData.append("logoFile", logoFile);

    try {
      const response = await api.post("/api/company/storeregister", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    <div className="flex flex-col items-center min-w-full min-h-[80vh] p-8 bg-slate-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">관리자 업체 등록 페이지</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-lg">
        {/* 엑셀 파일 첨부 */}
        <div className="flex flex-col w-full">
          <label htmlFor="excelFile" className="text-lg font-semibold text-gray-700 mb-2">
            스토어 엑셀 파일
          </label>
          <input
            type="file"
            id="excelFile"
            accept=".xlsx"
            onChange={handleExcelFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
          />
          {excelFile && <p className="mt-2 text-gray-600">첨부된 엑셀 파일: {excelFile.name}</p>}
        </div>

        {/* 로고 파일 첨부 */}
        <div className="flex flex-col w-full">
          <label htmlFor="logoFile" className="text-lg font-semibold text-gray-700 mb-2">
            스토어 로고 파일
          </label>
          <input
            type="file"
            id="logoFile"
            accept=".jpg, .png, .webp, .gif, .ico, .jpeg"
            onChange={handleLogoFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
          />
          {logoFile && <p className="mt-2 text-gray-600">첨부된 로고 파일: {logoFile.name}</p>}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full py-3 mt-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          등록
        </button>
      </form>
    </div>
  );
}
