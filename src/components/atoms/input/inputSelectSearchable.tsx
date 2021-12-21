import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Select from "react-select";

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
    isSearchable: boolean;
    isUpdateField?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setStateValue?: (value: number) => void;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (field: string, value: number) => void;
}

const InputSelectSearchable = ({
    data,
    defaultValue,
    dotPosition,
    errorMessage,
    isError,
    isSearchable = true,
    isUpdateField = false,
    refForm,
    register,
    required,
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
    const values: { value: number; label: string }[] = data.reduce((acc, curVal) => {
        acc.push({ value: curVal.id, label: curVal.value });
        return acc;
    }, []);

    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        container: (provided, state) => ({
            ...provided,
            background: "#15304C",
            padding: 10,
            color: "#DAE5E5",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        input: (provided, state) => ({
            ...provided,
            color: "#DAE5E5",
            margin: 0,
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        valueContainer: (provided, state) => ({
            ...provided,
            color: "#DAE5E5",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dropdownIndicator: (provided, state) => ({
            ...provided,
            display: "bloc",
            padding: 0,
            position: "absolute",
            right: 5,
            top: 10,
            border: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        noOptionsMessage: (provided, state) => ({
            ...provided,
            background: "#15304C",
            borderRaduis: 10,
            margin: 0,
        }),
        option: (provided, state) => ({
            ...provided,
            innerWidth: "100%",
            InputSelect: "100%",
            borderBottom: "1px dotted #DAE5E5",
            background: "#15304C",
            color: state.isSelected ? "#FF1166" : "#DAE5E5",
            padding: 10,
        }),

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        control: (provided, state) => ({
            ...provided,
            width: "100%",
            color: "#DAE5E5",
            background: "#15304C",
            border: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        singleValue: (provided, state) => ({
            ...provided,
            color: "#DAE5E5",
        }),
    };

    const inputSelectRegister =
        register &&
        register(refForm, {
            required,
            validate: (value) => (required ? data.some((element) => element.id === parseInt(value)) : true),
        });

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

    return (
        <div className="w-full flex items-center" data-testid="inputSelect-body">
            <Select
                {...inputReducer}
                className="flex items-center w-full my-1 text-neo-light-grey  rounded-md text-xs font-bold"
                isSearchable={isSearchable}
                styles={customStyles}
                options={values}
                // onBlur={() => console.log("BLUR")}
                noOptionsMessage={(obj: { inputValue: string }) => `${obj.inputValue} not found`}
                form={refForm}
                placeholder={refForm}
                onChange={(val, md): void => {
                    // console.log("VALUE", val);
                    // console.log("STATE", state);
                    inputSelectRegister?.onChange({ type: "change", target: { value: val.value } });
                    if (isUpdateField) {
                        if (val.value !== state.previous) {
                            dispatch({ type: "UPDATING", payload: val.value });
                        } else {
                            dispatch({ type: "CANCEL_UPDATE" });
                        }
                    } else {
                        dispatch({ type: "RESET", payload: val.value });
                    }
                    if (setStateValue) {
                        setStateValue(val.value);
                    }
                    if (state.timeoutId) {
                        clearTimeout(state.timeoutId);
                    }
                }}
            />
            <div className="mx-3 w-9">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isError={isError}
                        isSuccess={state.isSuccess}
                        isUpdateField={isUpdateField}
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
                        positionClassname={dotPosition}
                        trigger={state.trigger}
                    />
                )}
            </div>
        </div>
    );
};

export default InputSelectSearchable;
