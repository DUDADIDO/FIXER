import React from "react";
import dummyNoticeData from "./dummyNoticeData.json"; // JSON 파일로부터 데이터 가져오기

export default function NoticeDetail({ data = dummyNoticeData }) {
  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      <div className="w-full mb-4">
        <p className="text-2xl font-semibold mb-2">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <p>작성자: {data.author}</p>
            <p>|</p>
            <p>{data.created_at}</p>
          </div>
        </div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="p-4">
        <p>{data.content}</p>
      </div>
    </div>
  );
}
