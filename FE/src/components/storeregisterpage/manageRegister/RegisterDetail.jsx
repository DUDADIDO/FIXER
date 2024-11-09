import React from "react";
import { useLocation } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function RegisterDetail() {
  const location = useLocation();
  const { data } = location.state || {}; 

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      <div className="w-full mb-4">
        <p className="text-2xl font-semibold mb-2">{data.userName}의 신청</p>
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="p-4">
        <p>{data.content}</p>
        {data.applicationPath && (
          <div className="p-4">
            <p className="font-semibold">첨부된 파일:</p>
                  <a
                    href={`${apiBaseUrl}${data.applicationPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    파일 다운로드
                  </a>

          </div>
        )}
        {data.filePaths && data.filePaths.length > 0 && (
          <div className="p-4">
            <p className="font-semibold">첨부된 파일:</p>
            <ul>
              {data.filePaths.map((filePath, index) => (
                <li key={index}>
                  <a
                    href={`${apiBaseUrl}${filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    파일 {index + 1} 다운로드
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        
      </div>
    </div>
  );
}
