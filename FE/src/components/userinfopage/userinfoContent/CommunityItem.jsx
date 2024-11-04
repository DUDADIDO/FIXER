import { useState } from "react";
import { Link } from "react-router-dom";

export default function CommunityItem({ data }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`${data.id}`}
      state={{ data }}
      className="flex justify-between items-center font-bold"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p className="w-1/12 text-center">{data.id}</p>
      <div className="w-8/12 flex justify-start items-center">
        <p
          className={`truncate ${isHover ? "text-blue-500" : ""} duration-150`}
        >
          {data.title}
        </p>
        <p>&nbsp;&nbsp;&nbsp;</p>
        <span className="text-gray-400 font-light">[{data.comment_cnt}]</span>
      </div>
      {/* 사용자 이름 제거 */}
      <p className="w-2/12 text-center text-xs text-gray-500">{data.created_at}</p> {/* 날짜 폰트 크기 줄이기 */}
      <p className="2-1/12 text-center">{data.view_cnt}</p>
    </Link>
  );
}
