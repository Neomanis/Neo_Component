import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IInputSelect } from "../../../interface";
import inputReducer from "../../utils/reducers/inputReducer";
import Dot from "../dot";

interface Props {
    data: Array<IInputSelect>;
    defaultValue?: number;
    dotPosition?: string;
    errorMessage?: string;
    id?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    optionClassName?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    selectClassName?: string;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    setStateValue?: (value: number) => void;
    updateFunction?: (field: string, value: number) => void;
}

const InputSelect = ({
    data,
    defaultValue,
    dotPosition,
    errorMessage,
    id,
    isError,
    isUpdateField = false,
    label,
    labelClassName,
    optionClassName,
    refForm,
    register,
    required,
    setValue,
    targetId,
    selectClassName,
    timerSetting = 5000,
    setStateValue,
    updateFunction,
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
        dispatch({ type: "RESET", payload: defaultValue as number });
        setValue && setValue(refForm, defaultValue);
        return () => {
            isLastMount.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId]);

    useEffect(() => {
        if (isUpdateField && state.updated !== state.previous) {
            const newTimeout = setTimeout((): void => {
                if (updateFunction) {
                    updateFunction(refForm, state.updated as number);
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
                    updateFunction && updateFunction(refForm, state.updated as number);
                    isLastMount.current = false;
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    const inputSelectRegister =
        register &&
        register(refForm, {
            required,
            validate: (value) => (required ? data.some((element) => element.id === parseInt(value)) : true),
        });

    return (
        <div className="w-full flex items-center">
            <label className={`flex items-center w-full my-1`}>
                {label && (
                    <div className={`text-neo_blue-light text-xs font-bold w-2/4 ${labelClassName}`}>{label}</div>
                )}
                <select
                    className={`w-full bg-neo_blue p-2 rounded truncate ${selectClassName}`}
                    id={id}
                    value={state.updated as number}
                    {...inputSelectRegister}
                    onChange={(e): void => {
                        inputSelectRegister?.onChange(e);
                        if (isUpdateField) {
                            if (parseInt(e.target.value) !== state.previous) {
                                dispatch({ type: "UPDATING", payload: parseInt(e.target.value) });
                            } else {
                                dispatch({ type: "CANCEL_UPDATE" });
                            }
                        } else {
                            dispatch({ type: "RESET", payload: parseInt(e.target.value) });
                        }

                        if (setStateValue) {
                            setStateValue(parseInt(e.target.value));
                        }
                        if (state.timeoutId) {
                            clearTimeout(state.timeoutId);
                        }
                    }}
                >
                    {defaultValue === -1 && (
                        <option className={`${optionClassName}`} value={-1} key={-1}>
                            - - -
                        </option>
                    )}
                    {data
                        ? data.map((data) => (
                              <option className={`${optionClassName}`} key={data.id} value={data.id}>
                                  {data.value}
                              </option>
                          ))
                        : null}
                </select>
            </label>
            <div className="mx-3 w-9">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        positionClassname={dotPosition}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isSuccess={state.isSuccess}
                        isError={isError}
                        errorMessage={errorMessage}
                        isUpdateField={isUpdateField}
                        trigger={state.trigger}
                        onClickCallback={(): void => {
                            if (setValue && state.previous) {
                                setValue(refForm, state.previous);
                            }
                            if (setStateValue && state.previous) {
                                setStateValue(state.previous as number);
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

export default InputSelect;
