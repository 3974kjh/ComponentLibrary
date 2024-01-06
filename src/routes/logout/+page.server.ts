export const actions = {
	default: ({ cookies }) => {
		// 로그아웃 시 쿠기 정보 초기화
		cookies.delete('logged_success', { path: '/' });
		return true;
	}
};
