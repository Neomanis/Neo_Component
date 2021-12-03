import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { UseFormSetValue, UseFormRegister, FieldValues, UseFormClearErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import inputReducer from "../../utils/reducers/inputReducer";
import Dot from "../dot";

interface Props {
    clearErrors?: UseFormClearErrors<FieldValues>;
    defaultValue?: string;
    dotPosition?: string;
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
}

const TestEditableTextarea = ({
    clearErrors,
    defaultValue = "",
    dotPosition,
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
    const [isFocused, setIsFocused] = useState(false);

    function getHTMLValue(e: string): string {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
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

    useEffect(() => {
        register && register(refForm, { required });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch({ type: "RESET", payload: getHTMLValue(defaultValue) as string });
        setValue && setValue(refForm, getHTMLValue(defaultValue));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId]);

    useEffect(() => {
        if (isUpdateField && state.updated && state.updated !== state.previous) {
            console.log("Hello");
            const newTimeout = setTimeout(() => {
                console.log("World ??");
                if (updateFunction && state.updated) {
                    console.log("World");
                    updateFunction(refForm, state.updated as string);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }
            }, timerSetting);
            dispatch({ type: "SET_TIMEOUT", payload: newTimeout });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    return (
        <div className="flex w-full">
            <ReactQuill
                theme="snow"
                value={state.updated as string}
                onBlur={(previousSelection, source, editor) => {
                    setIsFocused(false);
                    if (isUpdateField && state.previous !== editor.getHTML() && !isError) {
                        dispatch({ type: "UPDATING", payload: editor.getHTML() });
                        if (state.timeoutId) {
                            clearTimeout(state.timeoutId);
                        }
                    }
                }}
                onChange={(data) => {
                    if (isFocused) {
                        setValue && setValue(refForm, data, { shouldValidate: true });
                        dispatch({ type: "ON_CHANGE", payload: data });
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
                    }
                }}
                onFocus={() => setIsFocused(true)}
                modules={modules}
                formats={formats}
            />
            <div className="w-5 mx-3 mt-2">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
                        isUpdateField={isUpdateField}
                        onClickCallback={(): void => {
                            if (setValue && clearErrors) {
                                setValue(refForm, state.previous);
                                clearErrors();
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                        positionClassname={dotPosition}
                        trigger={state.trigger}
                    />
                )}
            </div>
        </div>
    );
};

export default TestEditableTextarea;
