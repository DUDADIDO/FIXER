import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

// 쿠키에서 JWT 토큰 가져오기 함수
function getJwtTokenFromCookie() {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find(cookie => cookie.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
}

// 요청 시 토큰을 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
    const token = getJwtTokenFromCookie();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
