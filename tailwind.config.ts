import type { Config } from 'tailwindcss'
import plugin from 'flowbite/plugin'
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // @ts-ignore
        plugin({
            charts: true,
        }),
    ],
} satisfies Config
