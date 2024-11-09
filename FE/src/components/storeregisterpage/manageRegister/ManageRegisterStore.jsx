import { useEffect, useState } from "react";
import RegisterBox from "./RegisterBox"; // RegisterBox 컴포넌트 가져오기
import api from "@/api.jsx"; // axios 인스턴스 가져오기

function ManageRegisterStore() {
  const [applications, setApplications] = useState([]); // 데이터 저장할 상태

  // 모든 신청서를 불러오는 함수
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/application"); // 신청서 목록 엔드포인트로 요청
        setApplications(response.data); // 응답 데이터 저장
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-8 w-full max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">업체 등록 관리 페이지</h1>
      <RegisterBox title="등록된 신청서" data={applications} />
    </div>
  );
}

export default ManageRegisterStore;
