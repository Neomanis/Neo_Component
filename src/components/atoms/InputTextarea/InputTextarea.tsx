import React, { InputHTMLAttributes, ReactElement, useEffect, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useInputs } from "@/utils/hooks/useInputs";
import Updater from "../Updater";
import Icon from "../Icon";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { classNames as utilsClassNames } from "@/utils";

export interface InputTextareaProps {
    classNames?: {
        container?: string;
        dot?: string;
        labelBody?: string;
        labelText?: string;
        textArea?: string;
    };
    customValidation?: ReactHookFormCustomValidation<string>;
    defaultValue?: string;
    errorMessage?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    onChangeCallBack?: () => void;
    placeholder?: string;
    readOnly?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: string | number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
}

const InputTextarea = ({
    classNames,
    customValidation,
    defaultValue,
    errorMessage,
    isError,
    isUpdateField = false,
    label,
    onChangeCallBack,
    placeholder,
    readOnly = false,
    refForm,
    register,
    required,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
    ...props
}: InputTextareaProps & InputHTMLAttributes<HTMLTextAreaElement>): ReactElement => {
    const [state, dispatch] = useInputs(defaultValue);
    const isLastMount = useRef(false);

    const inputRegister =
        register && register(refForm, { required: required && errorMessage, validate: { ...customValidation } });

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        setValue && setValue(refForm, defaultValue);
        return () => {
            isLastMount.current = true;
        };
    }, [targetId]);

    useEffect(() => {
        if (isUpdateField && state.updated && state.updated !== state.previous) {
            const newTimeout = setTimeout((): void => {
                if (updateFunction && state.updated) {
                    updateFunction(refForm, state.updated);
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
                    updateFunction && updateFunction(refForm, state.updated);
                    isLastMount.current = false;
                }
            };
        }
    }, [state.updated, state.previous]);

    return (
        <div className={utilsClassNames(classNames?.container, "group ")} data-testid="inputTextarea-body">
            <label className={classNames?.labelBody ?? ""}>
                <div className={`${isUpdateField && "h-6"} flex justify-between items-center`}>
                    <div className={classNames?.labelText ?? ""}>{label}</div>
                    <div className={`${classNames?.dot ?? ""}`}>
                        {(isUpdateField || isError) && (
                            <Updater
                                isCancelable={state.isCancelable}
                                isUpdate={state.isCooldown}
                                isError={isError}
                                isSuccess={state.isSuccess}
                                fCallBackCancel={(): void => {
                                    if (setValue && state.previous) {
                                        setValue(refForm, state.previous);
                                    }
                                    if (state.timeoutId) {
                                        clearTimeout(state.timeoutId);
                                    }
                                    dispatch({ type: "CANCEL_UPDATE" });
                                }}
                                trigger={state.trigger}
                                updateCooldown={timerSetting}
                                errorMessage={errorMessage}
                                id={props.id}
                            />
                        )}
                    </div>
                </div>
                <textarea
                    disabled={readOnly}
                    {...inputRegister}
                    className={utilsClassNames(classNames?.textArea, "relative")}
                    defaultValue={defaultValue}
                    onBlur={(e): void => {
                        if (!readOnly) {
                            if (isUpdateField && state.previous !== e.target.value && !isError) {
                                dispatch({ type: "UPDATING", payload: e.target.value });
                                if (state.timeoutId) {
                                    clearTimeout(state.timeoutId);
                                }
                            }
                        }
                    }}
                    onChange={(e): void => {
                        if (!readOnly) {
                            onChangeCallBack && onChangeCallBack();
                            inputRegister && inputRegister.onChange(e);
                            if (isUpdateField) {
                                if (state.previous !== e.target.value) {
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
                    placeholder={placeholder}
                    {...props}
                ></textarea>
                {isUpdateField && (
                    <Icon
                        fontIcon={faPenToSquare}
                        className="group-hover:opacity-100 opacity-0 text-neo-link absolute right-2 top-8 transition-all"
                    />
                )}
            </label>
        </div>
    );
};

export default InputTextarea;
