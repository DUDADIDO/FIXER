import { useState, useEffect } from "react";

export default function CrawlingCard({ index, deal }) {
  return (
    <li className="mb-4 border-2 border-stone-500 px-4 py-2 rounded-lg">
      <div className="flex gap-8">
        <img
          src={deal.imageUrl}
          alt={`Deal ${index}`}
          className="border-2 rounded-lg"
        />
        <div className="flex flex-col justify-evenly">
          <div className="">
            <p className="bg-slate-300 w-fit px-2 rounded-lg text-sm mb-2">
              {deal.platform}
            </p>
            <a
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline-offset-2 hover:cursor-pointer hover:text-blue-500 text-2xl font-bold"
            >
              {deal.productName}
            </a>
          </div>
          <p>가격: {deal.price}</p>
        </div>
      </div>
    </li>
  );
}
