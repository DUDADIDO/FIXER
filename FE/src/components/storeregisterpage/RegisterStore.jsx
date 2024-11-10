import { useState } from "react";
import api from "@/api";

export default function RegisterStore() {
  const [applicationForm, setApplicationForm] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const handleApplicationFormChange = (e) => {
    setApplicationForm(e.target.files[0]);
  };

  const handleZipFileChange = (e) => {
    setZipFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicationForm || !zipFile) {
      alert("신청서와 zip 파일을 모두 첨부해주세요.");
      return;
    }

    const userNum = localStorage.getItem("userNum");

    const formData = new FormData();
    formData.append("user_num", userNum);
    formData.append("applicationForm", applicationForm);
    formData.append("zipFiles", zipFile);

    try {
      const response = await api.post("/api/application/storeregister", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("업체 등록 신청이 완료되었습니다.");
      }
    } catch (error) {
      console.error("업체 등록 신청 중 오류 발생:", error);
      alert("업체 등록 신청에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full min-h-[80vh] p-8 bg-slate-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">업체 등록 신청</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-lg">
        <div className="flex flex-col w-full">
          <label htmlFor="applicationForm" className="text-lg font-semibold text-gray-700 mb-2">
            신청서 파일 첨부
          </label>
          <input
            type="file"
            id="applicationForm"
            accept=".pdf, .doc, .docx"
            onChange={handleApplicationFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
          />
          {applicationForm && <p className="mt-2 text-gray-600">첨부된 신청서: {applicationForm.name}</p>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="zipFile" className="text-lg font-semibold text-gray-700 mb-2">
            자료 zip 파일 첨부
          </label>
          <input
            type="file"
            id="zipFile"
            accept=".zip,.rar,.7z"
            onChange={handleZipFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
          />
          {zipFile && <p className="mt-2 text-gray-600">첨부된 zip 파일: {zipFile.name}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          신청서 제출
        </button>
      </form>
    </div>
  );
}
