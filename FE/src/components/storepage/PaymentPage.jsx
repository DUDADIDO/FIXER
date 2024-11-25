import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "@/api"; // "@/api.jsx"에서 default export로 되어 있어야 함.
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const location = useLocation();
  const storeId = location.state?.storeId || ""; // 전달된 상점 ID를 가져옴
  const storeName = location.state?.storeName || ""; // 전달된 상점 이름을 가져옴
  const [amount, setAmount] = useState(""); // 결제 금액
  const [modelName, setModelName] = useState(""); // 모델명
  const [damageType, setDamageType] = useState(""); // 파손 유형

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      deviceName: modelName,
      damagedPart: damageType,
      repairCosts: amount,
      companyId: storeId,
    };

    try {
      console.log(payload);
      const response = await api.post(`/api/company/storeinfo/${storeId}/payment`, {
        deviceName: modelName,
        damagedPart: damageType,
        repairCosts: amount,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("결제가 완료되었습니다.");
        navigate(`/storeinfo/${storeId}/`);
      } else {
        alert("결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
      alert("결제 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl w-[80%] mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">결제 페이지 - 상점 이름: {storeName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">상점 이름</label>
          <input
            type="text"
            value={storeName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">결제 금액</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="결제 금액을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">모델명</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="모델명을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">파손 유형</label>
          <select
            value={damageType}
            onChange={(e) => setDamageType(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              파손 유형을 선택하세요
            </option>
            <option value="액정">액정</option>
            <option value="배터리">배터리</option>
            <option value="메인보드">메인보드</option>
            <option value="카메라">카메라</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          결제하기
        </button>
      </form>
    </div>
  );
}
