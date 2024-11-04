import { useState, useEffect } from "react";

import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

export default function ArticleLike() {
  const [isLike, setIsLike] = useState(false);

  const clikeLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div
      className="flex flex-col justify-center items-center hover:cursor-pointer bg-slate-600 px-4 py-2 mt-4 rounded-full"
      onClick={clikeLike}
    >
      <p className="text-3xl text-white">
        {isLike ? <BiSolidLike /> : <BiLike />}
      </p>
      <p className="text-sm font-bold text-white">좋아요</p>
    </div>
  );
}
