import { useState, useEffect } from "react";

import { FaComment } from "react-icons/fa";

export default function CommentList() {
  return (
    <div>
      <div className="flex justify-start items-center space-x-2 text-xl font-bold py-4">
        <p className="">
          <FaComment />
        </p>
        <p>댓글 :</p>
        <p>10개</p>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
    </div>
  );
}
