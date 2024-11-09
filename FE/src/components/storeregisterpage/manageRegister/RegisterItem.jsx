import React from "react";
import { Link } from "react-router-dom";

export default function RegisterItem({ data }) {
  return (
    <Link
      to={`/application/detail/${data.formId}`}
      state={{ data }}
      className="flex justify-between items-center font-bold"
    >
      <p className="w-1/12 text-center">{data.index}</p>
      <div className="w-8/12 flex justify-start items-center">
        <p className="truncate duration-150">{data.userName}의 신청</p>
      </div>
      <p className="w-1/12 text-center">{data.userName}</p>
      <p className="w-1/12 text-center">{new Date(data.createdAt).toLocaleString()}</p>
    </Link>
  );
}
