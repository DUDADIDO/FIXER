import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 인증된 요청 보내기
        axiosInstance.get('/api/user/me')
            .then(response => {
                console.log('User data fetched successfully:', response.data); // 확인용 로그
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                navigate('/login');
            });
    }, [navigate]);

    const handleLogout = () => {
        // JWT 토큰을 삭제
        document.cookie = 'jwtToken=; path=/; max-age=0;';
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>메인 페이지 - 로그인 완료!</h2>
            {userData ? (
                <div>
                    <p>사용자 이름: {userData.username}</p>
                    <p>이메일: {userData.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
                로그아웃
            </button>
        </div>
    );
}

export default HomePage;
