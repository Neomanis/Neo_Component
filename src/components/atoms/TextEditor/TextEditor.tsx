import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "@/styles/textEditor.css";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { classNames as utilsClassNames, createTimeout, getHTMLValue, useOnClickOutside, useInputs } from "@/utils";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import isEqual from "lodash.isequal";
import Updater from "../Updater";
import Icon from "../Icon";
export interface TextEditorProps {
    customValidation?: ReactHookFormCustomValidation<number | number[]>;
    defaultValue?: string;
    label?: string;
    labelClassName?: string;
    dotClassName?: string;
    errorMessage?: string;
    id?: string;
    isUpdateField?: boolean;
    readOnly?: boolean;
    refForm: string;
    formMethods: UseFormReturn;
    required?: boolean;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
    className: string;
}

const TextEditor = ({
    customValidation,
    defaultValue = "",
    label,
    labelClassName,
    dotClassName,
    errorMessage,
    id,
    isUpdateField = false,
    readOnly = false,
    refForm,
    formMethods,
    required,
    targetId,
    timerSetting = 5000,
    updateFunction,
    className,
}: TextEditorProps): ReactElement => {
    const [state, dispatch] = useInputs(getHTMLValue(defaultValue));

    const [isFocus, setIsFocus] = useState(false);
    const timer = useRef<ReturnType<typeof createTimeout> | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const {
        field: { ref, value, onChange },
        formState: { errors },
    } = useController({
        control: formMethods.control,
        name: refForm,
        rules: { required, validate: { ...customValidation } },
        shouldUnregister: false,
        defaultValue,
    });

    const isError = Boolean(refForm.split(".").reduce((acc, value) => acc?.[value], errors));

    useOnClickOutside(wrapperRef, () => {
        if (isFocus && isUpdateField && state.previous !== value && !isError) {
            dispatch({ type: "UPDATING", payload: value });
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
        dispatch({ type: "RESET", payload: getHTMLValue(defaultValue) as string });
        formMethods.setValue(refForm, getHTMLValue(defaultValue) === undefined ? null : getHTMLValue(defaultValue), {
            shouldValidate: false,
        });
        return () => {
            isLastMount.current = true;
        };
    }, [defaultValue, targetId]);

    useEffect(() => {
        return () => {
            timer.current?.trigger();
        };
    }, []);

    function handleChange(value: string) {
        onChange(value);
        if (isUpdateField) {
            timer.current?.clear();
            if (!isEqual(value, state.previous)) {
                dispatch({ type: "UPDATING", payload: value });
                timer.current = createTimeout(() => {
                    updateFunction?.(refForm, value);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = createTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, timerSetting);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        }
    }

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
                            timer.current?.clear();
                            dispatch({ type: "CANCEL_UPDATE" });
                            onChange(state.previous);
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
                    value={value}
                    ref={ref}
                    onFocus={() => {
                        timer.current?.clear();
                        dispatch({ type: "CANCEL_UPDATE" });
                    }}
                    onBlur={(_previousSelection, _source, editor) => {
                        if (!readOnly) {
                            handleChange(editor.getText());
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
