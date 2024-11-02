import React from 'react';

function LoginPage() {
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
