import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewItem({ data, storeId, reviewId }) {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <Link
      to={`/storeinfo/${storeId}/reviewdetail/${reviewId}`}
      state={{ data }}
      className="flex justify-between items-center font-bold py-2 hover:bg-gray-100"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p className="w-1/12 text-center">{data.index}</p>
      <div className="w-8/12 flex justify-start items-center">
        <p
          className={`truncate ${isHover ? "text-blue-500" : "text-gray-800"} duration-150`}
        >
          {data.comment}
        </p>
      </div>
      <p className="w-1/12 text-center text-gray-600 text-sm">작성자: {data.author}</p>
      <p className="w-2/12 text-center text-gray-600 text-sm">
        {new Date(data.createdAt).toLocaleString()}
      </p>
    </Link>
  );
}
