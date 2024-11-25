import { useState, useEffect } from "react";

export default function Question({ data }) {
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <p className="text-2xl font-bold">{data.title}</p>
        <p className="text-xs font-bold self-end">글쓴이 : {data.writer}</p>
      </div>
      <div className="bg-slate-100 shadow-md p-4 rounded-lg">
        <p className="line-clamp-4">{data.content}</p>
      </div>
    </div>
  );
}
