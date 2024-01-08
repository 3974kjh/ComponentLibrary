/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelte-ux/**/*.{svelte,js}'],
  theme: {
    extend: {
      colors: {
        accent: colors.blue,
      },
    },
  },
  plugins: [require('svelte-ux/plugins/tailwind.cjs')],
}
