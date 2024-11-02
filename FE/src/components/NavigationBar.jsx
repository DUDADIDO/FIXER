import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className=" bg-slate-300 h-[8vh] flex justify-between items-center px-5">
      <Link to="/">로고</Link>
      <div className="flex justify-evenly items-center gap-20">
        <Link to="/question">질문하기</Link>
        <Link to="/community">커뮤니티</Link>
        <Link to="/one-on-one">1:1 질문</Link>
        <Link to="/expert">전문가 신청</Link>
        <Link to="/service-center">고객센터</Link>
      </div>
      <Link to="/login">로그인</Link>
    </div>
  );
}
