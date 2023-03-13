import React, { ReactElement } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { classNames } from "@/utils";
import { TextEditorAdvancedMenu } from "./TextEditorAdvancedMenu";
import { useTranslation } from "@neomanis/neo-translation";
import { handleFiles, CustomImage } from "./CustomImage";
import { CustomTextAlign } from "./customTextAlign";
import { CustomCodeBlock } from "./CodeBlock";

export interface TextEditorAdvancedProps {
    formMethods: UseFormReturn;
    required?: boolean;
    refForm: string;
    defaultValue?: JSONContent[];
    label?: string;
    labelClassName?: string;
    editable?: boolean;
}

const TextEditorAdvanced = ({
    refForm,
    required = false,
    formMethods,
    defaultValue,
    label,
    labelClassName,
    editable = false,
}: TextEditorAdvancedProps): ReactElement => {
    const { t } = useTranslation();

    const editor = useEditor(
        {
            extensions: [
                StarterKit.configure({
                    dropcursor: { class: "animate-pulse", color: "#FFFFFF", width: 2 },
                    codeBlock: false,
                }),
                CustomTextAlign.configure({ types: ["heading", "paragraph", "customImage"] }),
                Underline,
                CustomImage,
                CustomCodeBlock,
            ],
            content: defaultValue
                ? {
                      type: "doc",
                      content: defaultValue,
                  }
                : null,
            onUpdate: ({ editor }) => {
                onChange(editor.getJSON());
            },
            editable,
            editorProps: {
                attributes: {
                    id: "text-editor",
                    // @tw
                    class: classNames(
                        "prose max-w-none w-full h-full outline-none p-4 prose-invert overflow-y-auto",
                        editable && "bg-neo-bg-B rounded-b-md"
                    ),
                },
                handleDrop: (view, event) => handleFiles(view, event),
            },
        },
        [editable, defaultValue]
    );

    const {
        field: { ref, onChange },
        formState: { errors },
    } = useController({
        control: formMethods?.control,
        name: refForm,
        rules: {
            ...(required
                ? {
                      validate: {
                          required: () => !editor?.isEmpty,
                      },
                  }
                : {}),
        },
        shouldUnregister: true,
        defaultValue,
    });

    return (
        <div className={classNames("w-full h-full grid grid-rows-[auto_auto_minmax(0,1fr)] gap-1")}>
            {editable && (
                <>
                    <div className="h-6 flex justify-between items-center">
                        <label className={labelClassName ?? "text-white"}>{label}</label>
                        <div data-testid="text-editor-advanced-error" className="text-neo-red text-xs font-bold">
                            {Boolean(errors[refForm]) && t("error.required")}
                        </div>
                    </div>
                    <TextEditorAdvancedMenu editor={editor} />
                </>
            )}
            <EditorContent editor={editor} className="w-full h-full" ref={ref} />
        </div>
    );
};

export default TextEditorAdvanced;
