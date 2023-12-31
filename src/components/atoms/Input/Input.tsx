import React, { InputHTMLAttributes, ReactElement, useEffect, useRef } from "react";
import { UseFormClearErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormResetField } from "react-hook-form";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useInputs } from "@/utils/hooks/useInputs";
import Updater from "../Updater";
import Icon from "../Icon";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button, CloseLogo, NeoColors, classNames } from "@/index";

export interface InputProps {
    autoComplete?: "on" | "off";
    className?: string;
    clearErrors?: UseFormClearErrors<FieldValues>;
    customValidation?: ReactHookFormCustomValidation<string>;
    defaultValue?: string;
    readOnly?: boolean;
    dotClassName?: string;
    errorMessage?: string;
    inputBoxClassName?: string;
    prefixClassName?: string;
    prefix?: string;
    inputClassName?: string;
    isAutoFocus?: boolean;
    isClearable?: boolean;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    onBlurCallBack?: () => void;
    onChangeCallBack?: (e: string) => void;
    onDotCancelCallBack?: (value: string) => void;
    onFocusCallBack?: () => void;
    pattern?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    resetField?: UseFormResetField<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    showLabelAndUpdater?: boolean;
    style?: React.CSSProperties;
    targetId?: string | number | undefined;
    timerSetting?: number;
    typeInput: string;
    updateFunction?: (refForm: string, value: string) => void;
}

const Input = ({
    autoComplete = "off",
    className,
    clearErrors,
    customValidation,
    defaultValue,
    readOnly,
    dotClassName,
    inputBoxClassName,
    prefix,
    prefixClassName,
    errorMessage,
    inputClassName,
    isAutoFocus = false,
    isClearable = false,
    isError,
    isUpdateField = false,
    label,
    labelClassName,
    onBlurCallBack,
    onChangeCallBack,
    onDotCancelCallBack,
    onFocusCallBack,
    pattern,
    placeholder,
    refForm,
    register,
    required,
    resetField,
    setValue,
    showLabelAndUpdater = true,
    style,
    targetId,
    timerSetting = 5000,
    typeInput,
    updateFunction,
    ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): ReactElement => {
    const [state, dispatch] = useInputs(defaultValue);

    const isLastMount = useRef(false);

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

    const inputRegister =
        register && register(refForm, { required: required && errorMessage, validate: { ...customValidation } });
    return (
        <div className={`${className} w-full flex items-center justify-center relative`} data-testid="input-body">
            <label className="w-full group">
                <div className={`${showLabelAndUpdater && "h-6"} flex justify-between items-center`}>
                    <p className={labelClassName}>{label}</p>
                    <div className={dotClassName}>
                        {(isUpdateField || isError) && (
                            <Updater
                                isCancelable={state.isCancelable}
                                isUpdate={state.isCooldown}
                                isError={isError}
                                errorMessage={errorMessage}
                                isSuccess={state.isSuccess}
                                fCallBackCancel={(): void => {
                                    if (setValue && clearErrors) {
                                        setValue(refForm, state.previous);
                                        clearErrors();
                                    }
                                    if (onDotCancelCallBack) {
                                        onDotCancelCallBack(state.previous);
                                    }
                                    if (state.timeoutId) {
                                        clearTimeout(state.timeoutId);
                                    }
                                    dispatch({ type: "CANCEL_UPDATE" });
                                }}
                                trigger={state.trigger}
                                id={props.id}
                            />
                        )}
                    </div>
                </div>
                <div className={inputBoxClassName}>
                    <span className={prefixClassName}>{prefix}</span>
                    <div className={classNames(isClearable && !readOnly && "flex items-center")}>
                        <input
                            id={props.id}
                            autoFocus={isAutoFocus}
                            data-testid="input"
                            {...inputRegister}
                            className={classNames(inputClassName, "w-full", isClearable && !readOnly && "pr-8")}
                            defaultValue={defaultValue}
                            autoComplete={autoComplete}
                            disabled={readOnly}
                            onBlur={(e): void => {
                                if (!readOnly) {
                                    onBlurCallBack && onBlurCallBack();
                                    if (isUpdateField && state.previous !== e.target.value && !isError) {
                                        dispatch({ type: "UPDATING", payload: e.target.value });
                                        if (state.timeoutId) {
                                            clearTimeout(state.timeoutId);
                                        }
                                    }
                                }
                            }}
                            onFocus={() => !readOnly && onFocusCallBack && onFocusCallBack()}
                            onChange={(e): void => {
                                if (!readOnly) {
                                    onChangeCallBack && onChangeCallBack(e.target.value);
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
                            pattern={pattern}
                            placeholder={placeholder}
                            type={typeInput}
                            style={style}
                            {...props}
                        />
                        {isClearable && !readOnly && (
                            <Button
                                startIcon={<CloseLogo className="w-3 h-3" fill={NeoColors.link} />}
                                onClick={() => !readOnly && resetField && resetField(refForm)}
                                variant="none"
                                size="none"
                                className="absolute top-1/2 translate-y-1/2 right-5"
                                id={`${props.id}-clear`}
                            />
                        )}
                    </div>

                    {isUpdateField && !readOnly && (
                        <Icon
                            fontIcon={faPenToSquare}
                            className={classNames(
                                "group-hover:opacity-100 opacity-0 text-neo-link absolute top-1/2 mt-1 transition-all",
                                isClearable ? "right-10" : "right-2"
                            )}
                        />
                    )}
                </div>
            </label>
        </div>
    );
};

export default Input;
