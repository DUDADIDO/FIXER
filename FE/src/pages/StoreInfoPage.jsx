import { useParams } from "react-router-dom";
import StoreInfoBox from "../components/storepage/StoreInfoBox";

function StoreInfoPage() {
    const { companyId } = useParams(); // companyId를 URL 파라미터에서 가져옴

    return (
        <div>
            <StoreInfoBox companyId={companyId} /> {/* company_id props로 전달 */}
        </div>
    );
}

export default StoreInfoPage;
