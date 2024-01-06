import { redirect } from '@sveltejs/kit';
import { axiosInstance } from '$lib/utils/axios';


export function load({ cookies, url }) {
	// 쿠기에 로그인 정보가 있으면 /hippo 경로로 이동
	if (cookies.get('logged_success')) {
		throw redirect(303, `/hippo`);
	}
}

export const actions = {
	login: async({ cookies, request, url, event }) => {
		let token = undefined;
    	const data = await request.formData();

		// 사용자 id, password 검증
		// const result = await axiosInstance.post('/common/cmn/web/CommonController/login.do', data);

		// 성공한 경우 쿠기에 로그인정보 담고, 토큰값 리턴
		if (result.data.count !== 0) {
			cookies.set('logged_success', true, { path: '/' });
			token = "123123412345"
		}

		return token;
	}
};
