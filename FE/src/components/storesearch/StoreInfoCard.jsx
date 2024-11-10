import { Link } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; // 서버 기본 URL 설정

export default function StoreInfoCard({ data, supportedDevices = [] }) {
  const {
    company_id,
    logo,
    name,
    description,
    supported_features = [],
    repair_count,
    score,
    review_cnt,
  } = data || {};

  // 로고 URL을 서버 기본 URL과 합쳐서 설정
  const logoUrl = logo ? `${apiBaseUrl}${logo}` : `${apiBaseUrl}/default-logo.png`;

  return (
    <Link to={`/storeinfo/${company_id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md flex items-center space-x-6 hover:bg-blue-50 transition duration-300 cursor-pointer">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="object-cover rounded-lg w-32 h-32 border border-gray-200" // 이미지 크기를 w-32 h-32로 고정
        />
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">{`<${name}>`}</p>
          <p className="text-gray-600 mt-2 text-sm">{description}</p>

          {/* 지원 기기 정보 표시 */}
          <div className="mt-3">
            <p className="text-gray-500 text-sm font-medium">지원 기기</p>
            <div className="flex flex-wrap mt-1">
              {supportedDevices.map((device) => (
                <span
                  key={device.brandDeviceMapId}
                  className="text-xs text-gray-700 m-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-md"
                >
                  {device.brandName} - {device.deviceTypeName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 text-gray-700">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">최근 수리 횟수</p>
              <p className="text-base font-semibold">{repair_count}회</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">평점</p>
              <p className="text-base font-semibold">{score} / 5</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">리뷰 개수</p>
              <p className="text-base font-semibold">{review_cnt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
