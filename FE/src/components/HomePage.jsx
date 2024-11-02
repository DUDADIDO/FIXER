import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function HomePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // 인증된 요청 보내기
        axiosInstance.get('/api/user/me')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>메인 페이지 - 로그인 완료!</h2>
            {userData && (
                <div>
                    <p>사용자 이름: {userData.username}</p>
                    <p>이메일: {userData.email}</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;
