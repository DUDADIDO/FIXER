import { useState, useEffect } from "react";

import Expert from "./Expert.jsx";

const dummy = [
  {
    id: 4,
    name: "전문가 1",
    produce: "전문가 1 소개글입니다.",
    hashTag: ["태그1", "태그2", "태그3"],
    image: "/chunsik.png",
    score: 4.5,
    questionCnt: 123,
  },
  {
    id: 5,
    name: "전문가 2",
    produce: "전문가 2 소개입니다.",
    hashTag: ["태그4", "태그5", "태그6"],
    image: "/chunsik.png",
    score: 3.8,
    questionCnt: 98,
  },
  {
    id: 6,
    name: "전문가 3",
    produce: "전문가 3 소개입니다.",
    hashTag: ["태그7", "태그8", "태그9"],
    image: "/chunsik.png",
    score: 4.2,
    questionCnt: 156,
  },
];

export default function ExpertList() {
  return (
    <div className="w-1/2 h-[80vh] rounded-2xl shadow-2xl border-gray-400 bg-appGrey2">
      <p className="p-4 text-3xl font-bold">전문가 목록</p>
      <div className="flex flex-col px-10 h-[90%] justify-around items-center">
        {dummy.map((expert) => (
          <Expert key={expert.id} data={expert} />
        ))}
      </div>
    </div>
  );
}
