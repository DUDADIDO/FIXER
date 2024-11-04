import React from "react";
import CommunitySectionWithPagination from "./CommunitySectionWithPagination";
import CommunityReviewData from "@/components/communitypage/CommunityReviewDummy.json";

export default function UserInfoReviewContent() {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <CommunitySectionWithPagination title="내가 쓴 리뷰" data={CommunityReviewData} />
    </div>
  );
}
