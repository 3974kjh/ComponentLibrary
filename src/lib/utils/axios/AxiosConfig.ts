import axios from 'axios';
import { tokenValue } from '../../../stores/tokenStore'

/**
 * axios의 기본 URL 및 header의 content-type을 설정한다.
 * REST 통신을 하기 때문에 Content-Type은 application/json을 기본으로 했다.
 */
const instance = axios.create({
	baseURL: 'http://localhost:8085',
	headers: {
		'Content-Type': 'application/json'
	}
});

/**
 * 요청 HTTP에 Authorization 헤더 추가, 값은 JWT로 설정한다.
 * @param {accessToken} accessToken
 */
const addAuthHeader = (accessToken: string): void => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

/**
 * 요청 HTTP에 Authorization 헤더 제거한다.
 */
const removeAuthHeader = (): void => {
	delete instance.defaults.headers.common['Authorization'];
}

/**
 * 토근 정보유무에 따라 axios 헤더를 동적으로 설정한다.
 * @returns 
 */
const axiosSetting = () => {
	tokenValue.subscribe((token) => {
		// store에 토큰정보가 있는 경우 axios 헤더에 해당 정보 추가
		if (token !== undefined){
			addAuthHeader(token)
		// 그 외 경우 axios 헤더의 Authorization 정보 삭제
		} else {
			removeAuthHeader()
		}
	})
	return instance;
}

export const axiosInstance = axiosSetting();
