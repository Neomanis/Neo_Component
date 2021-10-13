import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormClearErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import inputReducer from "../../utils/reducers/inputReducer";
import Dot from "../dot";

interface Props {
    clearErrors?: UseFormClearErrors<FieldValues>;
    defaultValue?: string;
    dotPosition?: string;
    errorMessage?: string;
    inputClassName?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    pattern?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    typeInput: string;
    timerSetting?: number;
    value?: string;
    onChangeCallBack?: () => void;
    updateFunction?: (refForm: string, value: string) => void;
    disabled?: boolean;
}

const Input = ({
    clearErrors,
    defaultValue,
    dotPosition,
    errorMessage,
    inputClassName,
    isError,
    isUpdateField = false,
    label,
    labelClassName,
    pattern,
    placeholder,
    refForm,
    register,
    required,
    setValue,
    targetId,
    timerSetting = 5000,
    typeInput,
    onChangeCallBack,
    updateFunction,
    disabled,
}: Props): ReactElement => {
    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultValue,
        updated: defaultValue,
        timeoutId: undefined,
        trigger: false,
    });

    const isLastMount = useRef(false);

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue as string });
        setValue && setValue(refForm, defaultValue);
        return () => {
            isLastMount.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    const inputRegister = register && register(refForm, { required });
    return (
        <div className={`${labelClassName} w-full flex items-center justify-center relative`}>
            <label className="w-full flex justify-center">
                {label}
                <input
                    disabled={disabled}
                    {...inputRegister}
                    className={`${inputClassName}`}
                    defaultValue={defaultValue}
                    pattern={pattern}
                    placeholder={placeholder}
                    type={typeInput}
                    onChange={(e): void => {
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
                    }}
                    onBlur={(e): void => {
                        if (isUpdateField && state.previous !== e.target.value && !isError) {
                            dispatch({ type: "UPDATING", payload: e.target.value });
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                        }
                    }}
                />
            </label>
            <div className="w-5 absolute -right-4">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        positionClassname={dotPosition}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isSuccess={state.isSuccess}
                        isError={isError}
                        isUpdateField={isUpdateField}
                        errorMessage={errorMessage}
                        trigger={state.trigger}
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
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
