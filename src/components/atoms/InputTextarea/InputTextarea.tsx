import React, { InputHTMLAttributes, ReactElement, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useInputs } from "@/utils/hooks/useInputs";
import Updater from "../Updater";
import Icon from "../Icon";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "@/utils";

export interface InputTextareaProps {
    autoComplete?: "on" | "off";
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
    required?: boolean;
    formMethods: UseFormReturn;
    targetId?: string | number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
}

const InputTextarea = ({
    autoComplete = "off",
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
    required,
    formMethods,
    targetId,
    timerSetting = 5000,
    updateFunction,
    ...props
}: InputTextareaProps & InputHTMLAttributes<HTMLTextAreaElement>): ReactElement => {
    const [state, dispatch] = useInputs(defaultValue);
    const isLastMount = useRef(false);

    const { setValue, register } = formMethods;

    const inputRegister = register(refForm, { required: required && errorMessage, validate: { ...customValidation } });

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        setValue(refForm, defaultValue);
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
        <div className="relative h-full group grid grid-rows-[auto_minmax(0,1fr)]" data-testid="inputTextarea-body">
            <label
                htmlFor={refForm}
                className={classNames((isUpdateField || label) && "h-6", "flex justify-between items-center")}
            >
                <div className="flex">
                    {label && <p className="font-bold text-neo-blue-secondary text-xs ml-3">{label}</p>}
                    {isUpdateField && (
                        <Icon
                            fontIcon={faPenToSquare}
                            className="group-hover:opacity-100 opacity-0 text-neo-link transition-all pl-2"
                        />
                    )}
                </div>
                {(isUpdateField || isError) && (
                    <Updater
                        isCancelable={state.isCancelable}
                        isUpdate={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
                        fCallBackCancel={(): void => {
                            if (state.previous) {
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
            </label>
            <textarea
                autoComplete={autoComplete}
                disabled={readOnly}
                {...inputRegister}
                className="bg-neo-bg-B rounded px-3 py-1 text-white w-full overflow-y-scroll custom-scroll scroll-B resize-none outline-none no-scrollbar h-full"
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
                id={refForm}
            ></textarea>
        </div>
    );
};

export default InputTextarea;
