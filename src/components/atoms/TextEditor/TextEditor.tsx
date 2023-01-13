import React, { ReactElement, useEffect, useRef, useState } from "react";
import { UseFormClearErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useInputs } from "@/utils/hooks/useInputs";
import { getHTMLValue } from "@/utils/tools";
import "@/styles/textEditor.css";
import Updater from "../Updater";
import { useOnClickOutside } from "@/utils/hooks/useOnClickOutside";
import { classNames as utilsClassNames } from "@/utils";
import Icon from "../Icon";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export interface TextEditorProps {
    clearErrors?: UseFormClearErrors<FieldValues>;
    customValidation?: ReactHookFormCustomValidation<number | number[]>;
    defaultValue?: string;
    label?: string;
    labelClassName?: string;
    dotClassName?: string;
    errorMessage?: string;
    id?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    readOnly?: boolean;
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
    label,
    labelClassName,
    dotClassName,
    errorMessage,
    id,
    isError,
    isUpdateField = false,
    readOnly = false,
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
    const [data, setData] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(wrapperRef, () => {
        if (isFocus && isUpdateField && state.previous !== data && !isError) {
            dispatch({ type: "UPDATING", payload: data });
            setIsFocus(false);
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
        }
    });

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

    if (readOnly) {
        return (
            <div className={className}>
                <label htmlFor={refForm} className={labelClassName}>
                    {label}
                </label>
                <div
                    className="mt-1 bg-neo-bg-B w-full h-full py-2 px-3 rounded text-white overflow-auto custom-scroll scroll-B"
                    dangerouslySetInnerHTML={{ __html: `${defaultValue}</br></br>` }}
                ></div>
            </div>
        );
    }

    return (
        <div className={utilsClassNames(className, "group relative")} data-testid="textEditor-body">
            <div className={utilsClassNames(dotClassName, isUpdateField && "h-6", "flex justify-between items-center")}>
                {label && (
                    <label htmlFor={refForm} className={utilsClassNames(labelClassName, "ml-4")}>
                        {label}
                    </label>
                )}
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
                        id={"updater-" + id}
                    />
                )}
            </div>
            <div className="flex w-full h-full mt-1 block" ref={wrapperRef}>
                {isUpdateField && (
                    <Icon
                        fontIcon={faPenToSquare}
                        className="group-hover:opacity-100 opacity-0 text-neo-link absolute right-4 top-9 mt-1 transition-all"
                    />
                )}
                <ReactQuill
                    readOnly={readOnly}
                    value={watch && watch(refForm)}
                    onChange={(data) => {
                        if (!readOnly) {
                            !isFocus && setIsFocus(true);
                            setValue && setValue(refForm, data, { shouldValidate: true });
                            setData(data);
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
                    modules={modules}
                    formats={formats}
                    id={id}
                />
            </div>
        </div>
    );
};

export default TextEditor;
