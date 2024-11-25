import { useState, useEffect } from "react";

export default function Expert({ data }) {
  return (
    <div className="flex justify-between min-h-24 w-full pb-4">
      <img
        src={data.image}
        alt={data.name}
        className="w-1/3 h-full rounded-xl"
      />
      <div className="flex flex-col w-full pl-6 justify-between">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{data.name}</p>
          <p>⭐ {data.score} / 5</p>
        </div>
        <div className="pt-2 flex flex-col">
          <p>전문 분야</p>
          <div className="flex justify-evenly">
            {data.hashTag.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 shadow-lg p-2 rounded-lg"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-end">{data.questionCnt} 건 답변</p>
      </div>
    </div>
  );
}
