import { writable } from "svelte/store";

/**
 * JWT 토큰값 저장 store
 */
export const tokenValue = writable("");