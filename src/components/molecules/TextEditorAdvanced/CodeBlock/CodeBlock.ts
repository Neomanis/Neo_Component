import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import "highlight.js/styles/stackoverflow-dark.css";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockNode from "./CodeBlockNode";

export const CustomCodeBlock = CodeBlockLowlight.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            lowlight,
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockNode);
    },
});
