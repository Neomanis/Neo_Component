import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
        svgr(),
        viteStaticCopy({ targets: [{ src: "./tailwind.config.js", dest: "." }] }),
        visualizer(),
    ],
    build: {
        minify: false,
        outDir: "build",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Neo_ComponentV2",
            formats: ["cjs"],
            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom", "@dnd-kit/core", "react-hook-form", "@neomanis/neo-translation"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
