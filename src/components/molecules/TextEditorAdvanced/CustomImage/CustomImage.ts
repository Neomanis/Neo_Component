import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CustomImageNode from "./CustomImageNode";

export const CustomImage = Image.extend({
    name: "customImage",
    group: "block",
    draggable: true,
    addOptions() {
        return {
            ...this.parent?.(),
            allowBase64: true,
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(CustomImageNode);
    },
});
