import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { UseFormSetValue, UseFormRegister, FieldValues, UseFormClearErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import "../../../styles/textEditor.css";

import inputReducer from "../../utils/reducers/inputReducer";
import Updater from "../updater";

interface Props {
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
}: Props): ReactElement => {
    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: getHTMLValue(defaultValue),
        timeoutId: undefined,
        trigger: false,
        updated: getHTMLValue(defaultValue),
    });

    function getHTMLValue(e: string): string {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

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
                if (updateFunction && state.updated) {
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
                            if (setValue && clearErrors) {
                                setValue(refForm, state.previous);
                                clearErrors();
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
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
                    defaultValue={getHTMLValue(defaultValue)}
                    onBlur={(previousSelection, source, editor) => {
                        if (source !== "silent") {
                            if (isUpdateField && state.previous !== editor.getHTML() && !isError) {
                                dispatch({ type: "UPDATING", payload: editor.getHTML() });
                                if (state.timeoutId) {
                                    clearTimeout(state.timeoutId);
                                }
                            }
                        }
                    }}
                    onKeyUp={(e) => {
                        setValue && setValue(refForm, e.target.innerHTML, { shouldValidate: true });
                        if (isUpdateField) {
                            if (state.previous !== e.target.innerHTML) {
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
