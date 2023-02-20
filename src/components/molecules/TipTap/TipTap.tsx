import React, { ReactElement, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { MenuButtons, TipTapMenu } from "./TipTapMenu";
import Underline from "@tiptap/extension-underline";
import { classNames, createTimeout, getHTMLValue } from "@/utils";
import { useTranslation } from "@neomanis/neo-translation";
import { useInputs } from "@/utils/hooks/useInputs";
import { useController, UseFormReturn } from "react-hook-form";
import { Updater } from "@/components/atoms";

// This fix a hot reload crash due to a issue with prosemirror
// see https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
import { EditorView } from "prosemirror-view";
EditorView.prototype.updateState = function updateState(state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.docView) return; // This prevents the matchesNode error on hot reloads
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.updateStateInner(state, this.state.plugins != state.plugins);
};

export interface TipTapProps {
    className?: string;
    defaultValue?: string;
    formMethods: UseFormReturn;
    id?: string;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    menuButtonsFilter?: MenuButtons[];
    refForm: string;
    required?: boolean;
    updateFunction?: (field: string, value: string) => void;
}

const TipTap = ({
    className,
    defaultValue = "",
    formMethods,
    id,
    isUpdateField = false,
    label,
    labelClassName = "text-xs font-bold text-neo-blue-secondary ml-4",
    menuButtonsFilter,
    refForm,
    required = false,
    updateFunction,
}: TipTapProps): ReactElement => {
    const timer = useRef<ReturnType<typeof createTimeout> | null>(null);
    const { t } = useTranslation();
    const [state, dispatch] = useInputs(getHTMLValue(defaultValue));
    const {
        field: { ref, value, onChange },
        formState: { errors },
    } = useController({
        control: formMethods.control,
        name: refForm,
        rules: {
            required,
            validate: {
                required: (value) => value !== "<p></p>",
            },
        },
        shouldUnregister: false,
        defaultValue: getHTMLValue(defaultValue),
    });
    const isError = Boolean(errors[refForm]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Underline,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());

            if (!isUpdateField) {
                return;
            }

            timer.current?.clear();
            if (editor.getHTML() !== state.previous) {
                dispatch({ type: "SHOW_DOT" });
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        },
        onBlur: () => {
            if (!isUpdateField) {
                return;
            }

            timer.current?.clear();
            if (formMethods.getValues(refForm) !== state.previous) {
                dispatch({ type: "UPDATING", payload: formMethods.getValues(refForm) });
                timer.current = createTimeout(() => {
                    updateFunction?.(refForm, formMethods.getValues(refForm));
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = createTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, 5000);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        },
        editorProps: {
            attributes: {
                id: "text-editor",
                // @tw
                class: "prose max-w-none w-full h-full bg-neo-bg-B outline-none p-4 prose-invert rounded-b-md overflow-y-auto",
            },
        },
    });

    useEffect(() => {
        return () => {
            timer.current?.trigger();
        };
    }, []);

    return (
        <div className={classNames("w-full h-full grid grid-rows-[auto_auto_minmax(0,1fr)] gap-1", className)}>
            <div className="h-6 flex justify-between items-center">
                <label className={labelClassName ?? "text-white"}>{label}</label>
                <div>
                    {(isUpdateField || isError) && (
                        <Updater
                            errorMessage={t("error.required")}
                            isCancelable={state.isCancelable}
                            isError={isError}
                            isSuccess={state.isSuccess}
                            isUpdate={state.isCooldown}
                            trigger={state.trigger}
                            fCallBackCancel={(): void => {
                                timer.current?.clear();
                                dispatch({ type: "CANCEL_UPDATE" });
                                onChange(state.previous);
                                state.previous && editor?.commands.setContent(state.previous);
                            }}
                            id={"updater-" + id}
                        />
                    )}
                </div>
            </div>
            <TipTapMenu editor={editor} menuButtonsFilter={menuButtonsFilter} />
            <EditorContent editor={editor} className="w-full h-full" ref={ref} />
        </div>
    );
};

export default TipTap;
