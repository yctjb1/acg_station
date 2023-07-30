import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import react from "@vitejs/plugin-react-swc";

// https://vite-rollup-plugins.patak.dev/

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        alias({
            entries: [
                { find: "@", replacement: "/src" },
                { find: "constants", replacement: "/src/constants" },
                { find: "componets", replacement: "/src/componets" },
                { find: "interface", replacement: "/src/interface" },
                { find: "models", replacement: "/src/models" },
                { find: "pages", replacement: "/src/pages" },
                { find: "services", replacement: "/src/services" },
                { find: "tool", replacement: "/src/tool" },
                { find: "utils", replacement: "/src/utils" },
                { find: "modules", replacement: "/src/modules" },
                { find: "routes", replacement: "/src/routes" },
            ],
        }),
        ,
        react(),
    ],
    server: {
        proxy: {//vite的代理基于 http-proxy 实现
            '/api': {
                target: 'http://localhost:1337', // Sails 项目的地址和端口
                changeOrigin: true,
                // rewrite: (path) => path.replace("http://www.acg-home.cn/api", '')
            },
        },
    },
});
