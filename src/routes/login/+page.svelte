<script lang="ts">
	import { enhance } from "$app/forms";
	import { TextField, Button, Tilt, Shine, Icon } from "svelte-ux";
	import { goto } from "$app/navigation";
	import { tokenValue } from "../../stores";
	import toast from "svelte-french-toast";

	// 입력한 ID
	let inputId: string;

	// 입력한 암호
	let inputPw: string;

	const successMsg: string = "로그인에 성공했습니다.";
	const errorMsg: string = "로그인에 실패했습니다.";

	/**
	 * 로그인 custom enhance 함수 정의
	 * @param param0
	 */
	const loginEnhanceCustom = ({
		formElement,
		formData,
		action,
		cancel,
		submitter,
	}) => {
		return async ({ result, update }) => {
			// 로그인 결과 값에 jwt 토큰값이 있는 경우 store에 저장 및 /main 경로로 이동
			if (!!result.data == true) {
				toast.success(successMsg, { duration: 800 });
				tokenValue.set(result.data);
				goto("/main");
			} else {
				toast.error(errorMsg, { duration: 800 });
			}
		};
	};
</script>

<div class="flex flex-col h-full w-full items-center justify-center p-10 shadow-lg space-y-10">
	<Shine>
		<div class="flex w-[15rem] items-center justify-center content-center gap-6">
			<Tilt class="hover:scale-110 transition duration-500 px-5" setBrightness>
				<p class="text-9xl">
					LIVRARY
				</p>
			</Tilt>
		</div>
	</Shine>
	<form method="POST" action="?/login" use:enhance={loginEnhanceCustom}>
		<div class="grid grid-rows-2">
			<div class="flex items-center justify-center relative">
				<TextField
					class="flex w-full items-center"
					placeholder="아이디 입력"
					name="USID"
					,
					classes={{ container: "bg-sky-50 p-1 font-bold w-[20rem]" }}
					bind:value={inputId}
				>
					<div slot="prepend">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="black"
							class="w-5 h-5"
						>
							<path
								d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
							/>
						</svg>
					</div>
				</TextField>
			</div>
			<div class="relative">
				<TextField
					class="flex w-full items-center"
					placeholder="비밀번호 입력"
					name="PW"
					,
					classes={{ container: "bg-sky-50 p-1 font-bold w-[20rem]" }}
					bind:value={inputPw}
				>
					<div slot="prepend">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="black"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</TextField>
			</div>
			<Button
				class="w-[320px] mt-7 h-10 text-white bg-[#1e90ff] rounded-lg shadow-lg cursor-pointer"
				type="submit">확인</Button
			>
		</div>
	</form>
</div>
