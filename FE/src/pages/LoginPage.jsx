import { useState, useEffect } from "react";

import LoginBox from "../components/loginpage/LoginBox";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full mt-[10vh]">
      <div className="mb-[10vh]">
        <h1 className="text-5xl text-center">알쏭달쏭</h1>
        <p className="text-center">대충 알쏭달쏭 한줄 소개 같은거</p>
      </div>
      <div className="flex justify-center items-center">
        <LoginBox />
      </div>
    </div>
  );
}
