import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { IInputSelect } from "../../../interface";
import inputReducer from "../../utils/reducers/inputReducer";
import Dot from "../dot";

interface Props {
    data: Array<IInputSelect>;
    defaultValue?: number;
    dotClassName?: string;
    errorMessage?: string;
    id?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    optionClassName?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    selectClassName?: string;
    setStateValue?: (value: number) => void;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (field: string, value: number) => void;
}

const InputSelect = ({
    data,
    defaultValue,
    dotClassName,
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
    selectClassName,
    setStateValue,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultValue,
        timeoutId: undefined,
        trigger: false,
        updated: defaultValue,
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
        <div className="w-full flex items-center" data-testid="inputSelect-body">
            <label className={`flex items-center w-full my-1`}>
                {label && <div className={`text-white text-xs font-bold w-2/4 ${labelClassName}`}>{label}</div>}
                <select
                    {...inputSelectRegister}
                    className={`w-full bg-neo-bg-B p-2 rounded truncate text-white ${selectClassName}`}
                    id={id}
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
                    value={state.updated as number}
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
            <div className={`w-5 ${dotClassName}`}>
                {(isUpdateField || isError) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
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
                        trigger={state.trigger}
                    />
                )}
            </div>
        </div>
    );
};

export default InputSelect;
