import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";

interface Props {
    placeholder?: string;
    required?: boolean;
    label?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    defaultValue?: string;
    isError?: boolean;
    errorMessage?: string;
    isUpdateField?: boolean;
    dotPosition?: string;
    onChangeCallBack?: () => void;
    updateFunction?: (refForm: string, value: string) => void;
    timerSetting?: number;
    targetId?: number | undefined;
}

const InputTextarea = ({
    placeholder,
    required,
    label,
    refForm,
    register,
    setValue,
    defaultValue,
    isError,
    errorMessage,
    isUpdateField = false,
    dotPosition,
    onChangeCallBack,
    updateFunction,
    timerSetting = 5000,
    targetId,
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
        <div className="w-full h-52 flex text-neo_blue-light ">
            <label className="w-full h-full">
                <div className="text-sm font-bold mr-2 mb-4">{label}</div>
                <textarea
                    className="w-full h-5/6 bg-neo_blue rounded border-2 border-neo_blue-light px-2 py-1 "
                    placeholder={placeholder}
                    {...(register && register(refForm, { required }))}
                    defaultValue={defaultValue}
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
                ></textarea>
            </label>
            <div className="w-5">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isSuccess={state.isSuccess}
                        isUpdateField={isUpdateField}
                        isError={isError}
                        positionClassname={dotPosition}
                        trigger={state.trigger}
                        onClickCallback={(): void => {
                            if (setValue && state.previous) {
                                setValue(refForm, state.previous);
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

export default InputTextarea;
