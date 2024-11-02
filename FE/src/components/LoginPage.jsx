import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 로그인 후 쿼리 파라미터에서 토큰 추출 및 저장
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        
        if (token) {
            // 토큰을 localStorage에 저장
            localStorage.setItem('authToken', token);
            // 토큰 저장 후 메인 페이지로 이동
            setTimeout(() => {
                navigate('/');
            }, 100); // 비동기적으로 토큰이 저장된 후 안전하게 리디렉션
        }
    }, [location, navigate]);

    const handleLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>소셜 로그인 테스트</h2>
            <button onClick={() => handleLogin('google')}>Google 로그인</button>
        </div>
    );
}

export default LoginPage;
