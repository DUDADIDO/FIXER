import { useState } from "react";

export default function RegisterStore() {
  const [applicationForm, setApplicationForm] = useState(null);
  const [zipFiles, setZipFiles] = useState([]);
  const [videoPreviewURLs, setVideoPreviewURLs] = useState([]);

  const handleApplicationFormChange = (e) => {
    setApplicationForm(e.target.files[0]);
  };

  const handleVideoFileChange = (e) => {
    const files = Array.from(e.target.files);
    setZipFiles(files);

    // 동영상 파일의 미리보기 URL 생성
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setVideoPreviewURLs(fileURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicationForm || zipFiles.length === 0) {
      alert("신청서와 동영상 파일을 모두 첨부해주세요.");
      return;
    }
    alert("업체 등록 신청이 완료되었습니다.");
    // 서버로 데이터를 보내는 로직 추가
  };

  return (
    <div className="flex flex-col items-center min-w-full min-h-[80vh] p-8 space-y-12 bg-slate-300">
      <h1 className="text-2xl font-bold">업체 등록 신청</h1>

      {/* 신청서 양식 다운로드 및 샘플 보기 */}
      <div className="flex flex-col items-center space-y-4">
        <a
          href="/path/to/download/form.pdf"
          className="border-2 border-black rounded-2xl p-2 transition duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105"
          download
        >
          신청서 양식 다운로드
        </a>
        <a
          href="/path/to/sample/form.pdf"
          className="border-2 border-black rounded-2xl p-2 transition duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          신청서 양식 샘플 보기
        </a>
      </div>

      {/* 설명란 */}
      <div className="text-center text-lg">
        업체 등록 신청을 위해 신청서와 동영상을 첨부해주세요.
      </div>

      {/* 신청서 및 동영상 파일 첨부란 */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-6 w-full max-w-md"
      >
        {/* 신청서 파일 첨부 */}
        <div className="flex flex-col w-full hover:cursor-pointer">
          <label htmlFor="applicationForm" className="mb-2 font-semibold">
            신청서 파일 첨부
          </label>
          <input
            type="file"
            id="applicationForm"
            accept=".pdf, .doc, .docx"
            onChange={handleApplicationFormChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* 동영상 파일 첨부 및 미리보기 */}
        <div className="flex flex-col w-full hover:cursor-pointer">
          <label htmlFor="videoFile" className="mb-2 font-semibold">
            동영상 파일 첨부 (여러 개 선택 가능)
          </label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            multiple
            onChange={handleVideoFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {/* 동영상 미리보기 */}
          <div className="flex flex-wrap gap-4 mt-4">
            {videoPreviewURLs.map((url, index) => (
              <video
                key={index}
                controls
                src={url}
                className="w-48 h-32 border border-gray-300 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="w-full mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            신청서 제출
          </button>
        </div>
      </form>
    </div>
  );
}
