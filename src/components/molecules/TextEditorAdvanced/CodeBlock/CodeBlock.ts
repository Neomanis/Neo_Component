import CodeBlockLowlight, { CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import "highlight.js/styles/stackoverflow-dark.css";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockNode from "./CodeBlockNode";

interface Options extends CodeBlockLowlightOptions {
    previewOnly: boolean;
}

export const CustomCodeBlock = CodeBlockLowlight.extend<Options>({
    addOptions() {
        return {
            ...this.parent?.(),
            lowlight,
            previewOnly: false,
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockNode);
    },
});
