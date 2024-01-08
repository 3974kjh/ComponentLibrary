import { redirect } from '@sveltejs/kit';
import { axiosInstance } from '$lib/utils/axios';


export function load({ cookies, url }) {
	// 쿠기에 로그인 정보가 있으면 /main 경로로 이동
	if (cookies.get('logged_success')) {
		throw redirect(303, `/main`);
	}
}

export const actions = {
	login: async({ cookies, request, url, event }) => {
		let token = undefined;
    	const data = await request.formData();

		cookies.set('logged_success', true, { path: '/' });
		token = "123123412345"

		return token;
	}
};
