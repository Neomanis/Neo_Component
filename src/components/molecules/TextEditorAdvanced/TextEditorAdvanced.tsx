import React, { ReactElement } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { classNames } from "@/utils";
import { TextEditorAdvancedMenu } from "./TextEditorAdvancedMenu";
import { useTranslation } from "@neomanis/neo-translation";

export interface TextEditorAdvancedProps {
    formMethods: UseFormReturn;
    required: boolean;
    refForm: string;
    defaultValue: JSONContent[];
    label?: string;
    labelClassName?: string;
    editable?: boolean;
}

const TextEditorAdvanced = ({
    refForm,
    required,
    formMethods,
    defaultValue,
    label,
    labelClassName,
    editable = false,
}: TextEditorAdvancedProps): ReactElement => {
    const { t } = useTranslation();
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Underline,
        ],
        content: {
            type: "doc",
            content: defaultValue,
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editable,
        editorProps: {
            attributes: {
                id: "text-editor",
                // @tw
                class: "prose max-w-none w-full h-full bg-neo-bg-B outline-none p-4 prose-invert rounded-b-md overflow-y-auto",
            },
        },
    });

    const {
        field: { ref, onChange },
        formState: { errors },
    } = useController({
        control: formMethods.control,
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

    if (!editable && editor) {
        return (
            <div
                className="prose max-w-none w-full h-full outline-none p-4 prose-invert rounded-b-md overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
        );
    }

    return (
        <div className={classNames("w-full h-full grid grid-rows-[auto_auto_minmax(0,1fr)] gap-1")}>
            <div className="h-6 flex justify-between items-center">
                <label className={labelClassName ?? "text-white"}>{label}</label>
                <div data-testid="text-editor-advanced-error" className="text-neo-red text-xs font-bold">
                    {Boolean(errors[refForm]) && t("error.required")}
                </div>
            </div>
            <TextEditorAdvancedMenu editor={editor} />
            <EditorContent editor={editor} className="w-full h-full" ref={ref} />
        </div>
    );
};

export default TextEditorAdvanced;
