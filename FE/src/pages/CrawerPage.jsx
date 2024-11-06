import React, { useEffect, useState } from 'react';

const CrawerPage = () => {
    const [deals, setDeals] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        // 백엔드에서 500개 제품 크롤링 데이터를 가져오는 함수
        const fetchDeals = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/sales/realtime-deals?limit=500');
                if (response.ok) {
                    const data = await response.json();
                    setDeals(data);
                } else {
                    console.error('Failed to fetch deals');
                }
            } catch (error) {
                console.error('Error fetching deals:', error);
            }
        };

        fetchDeals();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    return (
        <div>
            <h1>크롤링된 실시간 딜 목록</h1>
            <ul>
                {deals.length > 0 ? (
                    deals.slice(0, visibleCount).map((deal, index) => (
                        <li key={index}>
                            <a href={deal.link} target="_blank" rel="noopener noreferrer">
                                <p>플랫폼: {deal.platform}</p>
                                <p>상품명: {deal.productName}</p>
                                <p>가격: {deal.price}</p>
                                {deal.imageUrl && <img src={deal.imageUrl} alt={`Deal ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                            </a>
                        </li>
                    ))
                ) : (
                    <p>실시간 딜 정보를 가져오는 중입니다...</p>
                )}
            </ul>
            {visibleCount < deals.length && (
                <button onClick={handleLoadMore}>더보기</button>
            )}
        </div>
    );
};

export default CrawerPage;
