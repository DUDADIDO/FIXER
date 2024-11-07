import React from "react";
import { Link } from "react-router-dom";

export default function NoticeItem({ data, storeId, noticeId }) {
  console.log(data);
  return (
    <Link
      to={`/storeinfo/${storeId}/noticedtail/${noticeId}`}
      state={{ data }}
      className="flex justify-between items-center font-bold"
    >
      <p className="w-1/12 text-center">{data.index}</p>
      <div className="w-8/12 flex justify-start items-center">
        <p className="truncate duration-150">{data.title}</p>
      </div>
      <p className="w-1/12 text-center">작성자</p> {/* 이 부분은 데이터를 수정할 필요 있음 */}
      <p className="w-1/12 text-center">{new Date(data.createdAt).toLocaleString()}</p>
      <p className="w-1/12 text-center">조회수</p> {/* 조회수를 서버 데이터에 맞게 변경 */}
    </Link>
  );
}
