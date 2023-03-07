import TextAlign from "@tiptap/extension-text-align";
import { GlobalAttributes } from "@tiptap/react";

const textAlignFlexMap: Record<string, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    justify: "justify-center",
};

export const CustomTextAlign = TextAlign.extend({
    addGlobalAttributes() {
        const parent = this.parent?.();

        if (!isGlobalAttributes(parent)) {
            return [];
        }

        return [
            ...parent,
            {
                types: this.options.types,
                attributes: {
                    justifyContent: {
                        default: textAlignFlexMap[this.options.defaultAlignment],
                        rendered: false,
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            ...this.parent?.(),
            setTextAlign:
                (alignment: string) =>
                ({ commands }) => {
                    if (!this.options.alignments.includes(alignment)) {
                        return false;
                    }

                    return this.options.types.every((type) =>
                        commands.updateAttributes(type, {
                            textAlign: alignment,
                            justifyContent: textAlignFlexMap[alignment],
                        })
                    );
                },
        };
    },
});

function isGlobalAttributes(attr: unknown | GlobalAttributes | undefined): attr is GlobalAttributes {
    return Boolean(attr) && Array.isArray(attr);
}
