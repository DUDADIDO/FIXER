import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [damageType, setDamageType] = useState("");
  const [model, setModel] = useState("");

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) resetChatbot(); // 챗봇 초기화
  };

  const resetChatbot = () => {
    setCurrentStep(1);
    setBrand("");
    setDeviceType("");
    setDamageType("");
    setModel("");
  };

  const handleNext = (value) => {
    if (currentStep === 1) setBrand(value);
    if (currentStep === 2) setDeviceType(value);
    if (currentStep === 3) setDamageType(value);
    if (currentStep === 4) setModel(value); // 입력받은 모델명
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    console.log("선택된 정보:", { brand, deviceType, damageType, model });
    // API 호출
    fetch("/api/average-cost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, deviceType, damageType, model }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`평균 수리 비용: ${data.averageCost}원`);
        toggleChatbot();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("수리 비용을 가져오지 못했습니다.");
      });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Question
            question="어떤 브랜드 기기인가요?"
            options={["삼성", "LG", "애플", "레노보"]}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Question
            question="어떤 기기 유형인가요?"
            options={["스마트폰", "노트북"]}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <Question
            question="어떤 파손 유형인가요?"
            options={["액정", "메인보드", "카메라", "배터리"]}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">기기 모델명을 입력하세요</h3>
            {deviceType === "스마트폰" && (
              <p className="mb-2 text-gray-500">예) 갤럭시S24 → SM-S921</p>
            )}
            {deviceType === "노트북" && (
              <p className="mb-2 text-gray-500">예) 갤럭시북4 프로 → NT960XGK</p>
            )}
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="모델명을 입력하세요"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              제출
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-center">
      {/* 플로팅 아이콘 (챗봇이 닫힌 상태일 때만 표시) */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="w-16 h-16 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600"
        >
          💬
        </button>
      )}

      {/* 챗봇 UI (챗봇이 열린 상태일 때만 표시) */}
      {isOpen && (
        <div className="mt-4 bg-white w-80 h-96 shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col">
          <h2 className="text-lg font-bold mb-4">챗봇</h2>
          <div className="flex-grow overflow-auto">{renderStep()}</div>
          <button
            onClick={toggleChatbot}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

function Question({ question, options, onNext }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{question}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onNext(option)}
            className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
