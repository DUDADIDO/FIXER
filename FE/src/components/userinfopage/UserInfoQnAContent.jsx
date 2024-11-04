import CommunitySectionWithPagination from "./CommunitySectionWithPagination";
import CommunityQnAData from "./CommunityQnADummy.json"
function UserInfoQnAContent() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <CommunitySectionWithPagination title="내가 쓴 QnA" data={CommunityQnAData} />
        </div>
      );
}

export default UserInfoQnAContent;