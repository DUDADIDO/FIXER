import { useState, useEffect } from "react";
import indexImage from "../../public/index.png";
export default function MainPage() {
  return (
    <div className="flex flex-col w-full h-full gap-4 px-[10vh]">
      <div className="flex justify-center items-center gap-10 w-full h-full">
        <img src={indexImage} alt="FIXER 설명 이미지" className="w-[70%] h-auto" /> {/* 이미지 추가 */}
      </div>
    </div>
  );
}
