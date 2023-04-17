/** @type {import('tailwindcss').Config} */
// https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration
// 暗模式功能现在默认使用 media 策略启用
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
