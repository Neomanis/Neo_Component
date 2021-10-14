import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";
import image from "@rollup/plugin-image";
import typescript from "rollup-plugin-typescript2";
import svgr from "@svgr/rollup";
import packageJson from "./package.json";

export default {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        svgr(),
        css(),
        image(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
    ],
};
