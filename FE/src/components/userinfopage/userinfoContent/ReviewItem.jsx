import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ReviewItem({ data }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`/storeinfo/${data.companyId}/reviewdetail/${data.reviewId}`}
      state={{ data }}
      className="flex justify-between items-center font-bold"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p className="w-1/12 text-center">{data.index}</p>
      <div className="w-8/12 flex justify-start items-center">
        <p
          className={`truncate ${isHover ? "text-blue-500" : ""} duration-150`}
        >
          {data.comment}
        </p>
        <p>&nbsp;&nbsp;&nbsp;</p>
      </div>
      {/* 사용자 이름 제거 */}
      <p className="w-2/12 text-center text-xs text-gray-500">
        {data.createdAt.slice(0, 10)}
      </p>{" "}
      {/* 날짜 폰트 크기 줄이기 */}
      <p className="2-1/12 text-center">{data.view_cnt}</p>
    </Link>
  );
}
