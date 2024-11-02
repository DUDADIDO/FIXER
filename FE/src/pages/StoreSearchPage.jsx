import { useState, useEffect } from "react";

import StoreList from "../components/storesearch/StoreList";

export default function StoreSearch() {
  return (
    <div>
      <div>
        <p>검색창</p>
      </div>
      <div className="flex justify-center items-center h-full w-full bg-slate-400">
        <StoreList />
      </div>
    </div>
  );
}
