import { nodeResolve } from "@rollup/plugin-node-resolve"; // 以node的规则引入模块
import ts from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import path from "path";

export default {
  input: "src/index.ts",
  output: {
    file: path.resolve(__dirname, "dist/bundle.js"),
    format: "iife",
    sourcemap: true,
  },
  plugin: [
    // 插件顺序：先resolve、再编译ts、再serve
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    serve({
      port: 3000,
      contentBase: "", // 以根目录为基准
      // open: true, // 打开浏览器
      openPage: "/public/index.html", // 打开文件
    }),
  ],
};
