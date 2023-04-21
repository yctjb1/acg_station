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
    // https://mui.com/material-ui/guides/interoperability/#tailwind-css
    corePlugins: {
        preflight: false, //删除 Tailwind CSS 的预检样式，以便它可以改用 MUI 的预检样式
    },
    important: '#root',
};
