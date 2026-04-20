/*
 * @Author: mkRui 1102163949@qq.com
 * @Date: 2025-04-16 23:56:50
 * @LastEditors: mkRui 1102163949@qq.com
 * @LastEditTime: 2025-12-25 17:44:58
 * @FilePath: /fast-bjhj-website-admin/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  publicDir: "./public",
  server: {
    proxy: {
      "/webapi": {
        target: "http://aqzoracms.liangwannian.cn",
        changeOrigin: true,
        rewrite: (path) => {
          return path;
        },
      },
    },
  },
  build: {
    // 启用更好的压缩
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 分包策略
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd"],
          mobx: ["mobx", "mobx-react"],
          editor: ["@monaco-editor/react", "monaco-editor", "@tinymce/tinymce-react", "tinymce"],
        },
      },
    },
    // 设置chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    postcss: {
      plugins: [],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "antd",
      "mobx",
      "mobx-react",
      "react-router-dom",
    ],
  },
});
