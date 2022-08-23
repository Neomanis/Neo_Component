import React, { ReactElement, useEffect, useRef } from "react";
import { UseFormClearErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useInputs } from "@/utils/hooks/useInputs";
import { getHTMLValue } from "@/utils/tools";
import "@/styles/textEditor.css";
import Updater from "../Updater";

export interface TextEditorProps {
    clearErrors?: UseFormClearErrors<FieldValues>;
    customValidation?: ReactHookFormCustomValidation<number | number[]>;
    defaultValue?: string;
    dotClassName?: string;
    errorMessage?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
    className: string;
    watch?: UseFormWatch<FieldValues>;
}

const TextEditor = ({
    clearErrors,
    customValidation,
    defaultValue = "",
    dotClassName,
    errorMessage,
    isError,
    isUpdateField = false,
    refForm,
    register,
    required,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
    className,
    watch,
}: TextEditorProps): ReactElement => {
    const [state, dispatch] = useInputs(getHTMLValue(defaultValue));

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const isLastMount = useRef(false);

    useEffect(() => {
        register && register(refForm, { required: required && errorMessage, validate: { ...customValidation } });
    }, []);

    useEffect(() => {
        dispatch({ type: "RESET", payload: getHTMLValue(defaultValue) as string });
        setValue && setValue(refForm, getHTMLValue(defaultValue));
        return () => {
            isLastMount.current = true;
        };
    }, [targetId]);

    useEffect(() => {
        if (isUpdateField && state.updated && state.updated !== state.previous) {
            const newTimeout = setTimeout((): void => {
                if (updateFunction) {
                    updateFunction(refForm, state.updated as string);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }
            }, timerSetting);
            dispatch({ type: "SET_TIMEOUT", payload: newTimeout });
            return () => {
                if (isLastMount.current) {
                    clearTimeout(newTimeout);
                    updateFunction && updateFunction(refForm, state.updated as string);
                    isLastMount.current = false;
                }
            };
        }
    }, [state.updated, state.previous]);

    return (
        <div className={className} data-testid="textEditor-body">
            <div className={dotClassName}>
                {(isUpdateField || isError) && (
                    <Updater
                        isCancelable={state.isCancelable}
                        isUpdate={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
                        fCallBackCancel={(): void => {
                            setValue && setValue(refForm, state.previous);
                            clearErrors && clearErrors();
                            state.timeoutId && clearTimeout(state.timeoutId);
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                        trigger={state.trigger}
                        updateCooldown={timerSetting}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
            <div className="flex w-full h-full">
                <ReactQuill
                    value={watch && watch(refForm)}
                    onBlur={(previousSelection, source, editor) => {
                        // Paste action trigger onBlur event with parameter "source" return a string "silent",
                        // so we skip onBlur if this is the case
                        if (source !== "silent") {
                            if (isUpdateField && state.previous !== editor.getHTML() && !isError) {
                                dispatch({ type: "UPDATING", payload: editor.getHTML() });
                                if (state.timeoutId) {
                                    clearTimeout(state.timeoutId);
                                }
                            }
                        }
                    }}
                    onChange={(data) => {
                        setValue && setValue(refForm, data, { shouldValidate: true });
                        if (isUpdateField) {
                            if (state.previous !== data) {
                                dispatch({ type: "SHOW_DOT" });
                            } else {
                                dispatch({ type: "CANCEL_UPDATE" });
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                        }
                    }}
                    modules={modules}
                    formats={formats}
                />
            </div>
        </div>
    );
};

export default TextEditor;
