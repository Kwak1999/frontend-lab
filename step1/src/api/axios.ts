import axios from 'axios'

// Axios 인스턴스 생서
export const api = axios.create({
    baseURL: 'https://fakestoreapi.com', // 기본 URL
    timeout: 10000, //10초 타임아웃
    headers: {
        'Content-Type': 'application/json',
    }
})

// 요청 인터셉터 (요청 보내기 전에 실행)
api.interceptors.request.use(
    (config) => {
        // 여기서 토큰 추가 가능
        // const token = localStorage.getItem('token')
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`
        // }

        console.log('요청:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.log('요청에러:', error)
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (응답 받은 후 실행)
api.interceptors.response.use(
    (response) => {
        console.error('응답: ', response.status, response.config.url);
        return response;
    },
    (error) => {
        // 에러 처리
        if(error.response) {
            // 서버가 응답 했지만 에러
            console.log('서버 에러: ', error.response.status);

            // 401: 인증에러
            if(error.response.status === 401) {
                // 로그아웃 처리 등
                console.log('인증이 필요합니다.')
            }

            // 404: 찾을 수 없음
            if(error.response.status === 404) {
                console.log('요청한 리소스를 찾을 수 없습니다.')
            }
        } else if(error.request){
            // 요청은 보냈지만 응답 없음
            console.error('네트워크 에러: 응답없음')
        } else {
            // 요청 설정 중 에러
            console.error('요청 설정 에러: ', error.message)
        }

        return Promise.reject(error);
    }
)