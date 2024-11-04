import { useState, useEffect } from "react";

import ArticleLike from "./ArticleLike.jsx";
import CommentList from "./CommentList.jsx";

export default function CommunityDetail({ data }) {
  return (
    <div className="flex flex-col justify-start items-start mt-10">
      <div className="w-full">
        <p className=" text-xl font-semibold mb-4">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex w-1/2 space-x-2 items-center">
            <p>{data.author}</p>
            <p>|</p>
            <p>{data.created_at}</p>
          </div>
          <div className="flex w-1/2 justify-end items-center space-x-2">
            <p>조회 {data.view_cnt}</p>
            <p>|</p>
            <p>추천 {data.like_cnt}</p>
            <p>|</p>
            <p className="px-2 py-1 rounded-2xl bg-gray-300">
              댓글 {data.comment_cnt}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="p-4">
        <p>{data.content}</p>
      </div>
      <div className="flex justify-center w-full">
        <ArticleLike />
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="w-full">
        <CommentList />
      </div>
    </div>
  );
}
