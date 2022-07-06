import React, { ReactElement, useEffect, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import Updater from "../updater";
import { useInputs } from "../../utils/hooks/useInputs";

interface Props {
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
    refForm,
    register,
    required,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
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
        <div className={classNames.container ?? ""} data-testid="inputTextarea-body">
            <label className={classNames.labelBody ?? ""}>
                <div className={`${isUpdateField && "h-6"} flex justify-between items-center`}>
                    <div className={classNames.labelText ?? ""}>{label}</div>
                    <div className={`${classNames.dot ?? ""}`}>
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
                            />
                        )}
                    </div>
                </div>
                <textarea
                    {...inputRegister}
                    className={classNames.textArea ?? ""}
                    defaultValue={defaultValue}
                    onBlur={(e): void => {
                        if (isUpdateField && state.previous !== e.target.value && !isError) {
                            dispatch({ type: "UPDATING", payload: e.target.value });
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                        }
                    }}
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
                    placeholder={placeholder}
                ></textarea>
            </label>
        </div>
    );
};

export default InputTextarea;
