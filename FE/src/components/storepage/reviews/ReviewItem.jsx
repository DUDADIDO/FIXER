import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewItem({ data, storeId, reviewId }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`/storeinfo/${storeId}/reviewdetail/${reviewId}`}
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
        {/* <span className="text-gray-400 font-light">[{data.comment_cnt}]</span> */}
      </div>
      <p className="w-1/12 text-center">{data.author}</p>
      <p className="w-1/12 text-center">{data.createdAt}</p>
      {/* <p className="w-1/12 text-center">{data.view_cnt}</p> */}
    </Link>
  );
}