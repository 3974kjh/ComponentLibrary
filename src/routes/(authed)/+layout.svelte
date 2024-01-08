<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";

	const logoutEnhanceCustom = ({
		formElement,
		formData,
		action,
		cancel,
		submitter,
	}) => {
		return async ({ result, update }) => {
			if (result.data === true) {
				// 최상위 경로로 이동 (= 로그인페이지로 이동)
				goto("/");
			}
		};
	};
</script>

<slot />

<form method="POST" action="/logout" use:enhance={logoutEnhanceCustom}>
	<button>log out</button>
</form>
