import { useState, useEffect } from "react";

import StoreList from "../components/storesearch/StoreList";

export default function StoreSearch() {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full bg-slate-400">
        <StoreList />
      </div>
    </div>
  );
}
