import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // 토큰이 없으면 로그인 페이지로 리디렉션
        return <Navigate to="/login" />;
    }

    // 토큰이 있으면 보호된 페이지 렌더링
    return children;
};

export default ProtectedRoute;
