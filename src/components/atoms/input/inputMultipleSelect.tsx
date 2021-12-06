import React, { ReactElement, useEffect, useRef, ChangeEvent, useReducer } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { IInputSelect } from "../../../interface";
import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";

interface Props {
    activeItems?: Array<IInputSelect>;
    defaultItems?: Array<number>;
    dotPosition?: string;
    errorMessage?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    items: Array<IInputSelect>;
    label?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    timerSetting?: number;
    targetId?: number | undefined;
    updateFunction?: (refForm: string, value: number[]) => void;
}

const InputMultipleSelect = ({
    activeItems,
    defaultItems = [],
    dotPosition,
    errorMessage,
    isError,
    isUpdateField = false,
    items,
    label,
    refForm,
    register,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultItems,
        timeoutId: undefined,
        trigger: false,
        updated: defaultItems,
    });

    const selectInput = useRef<HTMLSelectElement>(null);
    const isInitialMount = useRef(true);
    const isLastMount = useRef(false);

    function areArraysEqual(previous: number[], updated: number[]) {
        if (previous.length !== updated.length) {
            return false;
        }

        for (let i = 0; i < previous.length; ++i) {
            if (previous[i] !== updated[i]) return false;
        }
        return true;
    }

    function handleAddItem(e: ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(e.target.value);
        // add items only if it is not already added and if it exist in the provided items
        if (
            !(state.updated as number[]).includes(value) &&
            (activeItems ? activeItems : items).some((element) => element.id === value) &&
            !(value === -1)
        ) {
            dispatch({ type: "HANDLE_DUPLICATE", payload: { value, isUpdateField } });
        }
    }

    useEffect(() => {
        register && register(refForm);
        dispatch({ type: "RESET", payload: defaultItems as number[] });
        setValue && setValue(refForm, defaultItems);
        if (selectInput.current) {
            selectInput.current.value = "-1";
        }
        return () => {
            isLastMount.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId]);

    useEffect(() => {
        setValue && setValue(refForm, state.updated);
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (isUpdateField) {
                if (!areArraysEqual(state.previous as number[], state.updated as number[])) {
                    const newTimeout = setTimeout((): void => {
                        if (updateFunction) {
                            updateFunction(refForm, state.updated as number[]);
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
                            updateFunction && updateFunction(refForm, state.updated as number[]);
                            isLastMount.current = false;
                        }
                    };
                } else if (!state.isSuccess) {
                    dispatch({ type: "CANCEL_UPDATE" });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    return (
        <div className="w-full flex" data-testid="inputMultipleSelect-body">
            <div className="w-full">
                <label className="flex justify-between items-center w-full">
                    {label && <div className="text-white text-xs font-bold w-2/4">{label}</div>}
                    <select
                        className="w-full bg-neo-bg-B p-2 rounded text-white truncate"
                        onChange={(e): void => {
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                            handleAddItem(e);
                        }}
                        ref={selectInput}
                    >
                        <option value={-1} key={-1}>
                            - - -
                        </option>
                        {(activeItems ? activeItems : items).map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.value}
                            </option>
                        ))}
                    </select>
                </label>
                {(state.updated as number[]).map((id, key) => {
                    const value = items.find((item) => id === item.id);
                    return (
                        <div className="flex bg-neo-bg-B my-1 rounded justify-between" key={key}>
                            <p className="m-2 text-white">{value?.value}</p>
                            <button
                                className="m-2 text-neo-red"
                                onClick={(): void => {
                                    if (state.timeoutId) {
                                        clearTimeout(state.timeoutId);
                                    }
                                    dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: {
                                            value: (state.updated as number[]).filter((item) => item !== value?.id),
                                            isUpdateField,
                                        },
                                    });
                                    if (selectInput.current) {
                                        selectInput.current.value = "-1";
                                    }
                                }}
                                type="button"
                                value={value?.id}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mx-3 mt-2 w-6">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
                        isUpdateField={isUpdateField}
                        onClickCallback={(): void => {
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                            dispatch({ type: "CANCEL_UPDATE" });
                            if (selectInput.current) {
                                selectInput.current.value = "-1";
                            }
                        }}
                        positionClassname={dotPosition}
                        trigger={state.trigger}
                    />
                )}
            </div>
        </div>
    );
};

export default InputMultipleSelect;
