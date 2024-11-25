import ExpertList from "@/components/mainpage/ExpertList.jsx";
import MainQnA from "@/components/mainpage/MainQnA.jsx";
import { useState, useEffect } from "react";

export default function MainPage() {
  return (
    <div className="flex flex-col w-full h-full gap-4 px-[10vh]">
      <div className="mt-10 text-center">
        <h1 className="text-2xl font-bold">알쏭달쏭</h1>
        <p>대충 알쏭달쏭 설명하는 글... 이미지로 대체 가능</p>
      </div>
      <div className="flex justify-center items-center gap-10 w-full h-full">
        <MainQnA />
        <ExpertList />
      </div>
    </div>
  );
}
