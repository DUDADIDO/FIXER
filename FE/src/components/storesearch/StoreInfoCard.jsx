import { useState, useEffect } from "react";

export default function StoreInfoCard({ data }) {
  const {
    logo,
    name,
    description,
    supported_features = [], // 기본값을 빈 배열로 설정하여 undefined 방지
    repair_count,
    score,
    review_cnt,
  } = data || {}; // data가 undefined일 경우를 대비해 기본값 설정

  return (
    <div className="bg-green-100 border border-gray-300 rounded-lg p-4 shadow-lg flex items-center space-x-4">
      <img
        src={logo}
        alt={`${name} logo`}
        className=" object-cover rounded-md"
      />
      <div>
        <p className="text-xl font-bold text-gray-800">{`<${name}>`}</p>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
        <div>
          <p className="text-gray-500 mt-2 text-sm text-center">주요 품목</p>
          <div className="flex justify-around">
            {supported_features.map((feature) => (
              <p key={feature} className="text-sm">
                {feature}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-around items-center mt-4">
          <div className="flex flex-col items-center">
            <p>최근 수리 횟수</p>
            <p>{repair_count}회</p>
          </div>
          <div>
            <p>평점: {score} / 5</p>
            <p>리뷰 갯수: {review_cnt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
