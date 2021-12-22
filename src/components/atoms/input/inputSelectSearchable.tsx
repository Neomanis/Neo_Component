import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";
import { i18n } from "../../..";

interface Props {
    data: Array<{ label: string; value: string }>;
    defaultValue?: number;
    dotPosition?: string;
    errorMessage?: string;
    id?: string;
    isClearable: boolean;
    isError?: boolean;
    isSearchable: boolean;
    isUpdateField?: boolean;
    languageUser?: string;
    placeholder: string;
    refForm: string;
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
    isClearable,
    isError,
    isSearchable = true,
    isUpdateField = false,
    languageUser = "en_US",
    placeholder,
    refForm,
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

    const values = data.reduce<{ value: number; label: string }[]>((acc, curVal) => {
        acc.push({ value: parseInt(curVal.value), label: curVal.label });
        return acc;
    }, []);

    const myLanguage = i18n.getFixedT(languageUser);
    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        container: (provided: any, state: any) => ({
            ...provided,
            background: "#15304C",
            padding: 0,
            margin: 0,
            color: "#DAE5E5",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input: (provided: any, state: any) => ({
            ...provided,
            color: "#DAE5E5",
            margin: 0,
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        valueContainer: (provided: any, state: any) => ({
            ...provided,
            color: "#DAE5E5",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            display: "bloc",
            padding: 0,
            position: "absolute",
            right: 5,
            top: 10,
            border: "none",
        }),
        clearIndicator: (provided: any, state: any) => ({
            ...provided,
            display: "bloc",
            padding: 0,
            position: "absolute",
            right: 30,
            top: 10,
            border: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        indicatorSeparator: (provided: any, state: any) => ({
            ...provided,
            display: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        noOptionsMessage: (provided: any, state: any) => ({
            ...provided,
            background: "#15304C",
            borderRaduis: 10,
            margin: 0,
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        option: (provided: any, state: { isSelected: any }) => ({
            ...provided,
            innerWidth: "100%",
            InputSelect: "100%",
            borderBottom: "1px dotted #DAE5E5",
            background: "#15304C",
            color: state.isSelected ? "#FF1166" : "#DAE5E5",
            padding: 10,
        }),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control: (provided: any, state: any) => ({
            ...provided,
            width: "100%",
            color: "#DAE5E5",
            background: "#15304C",
            border: "none",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: "#DAE5E5",
        }),
    };

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
                className="flex items-center w-full my-1  rounded-md text-xs font-bold"
                isSearchable={isSearchable}
                styles={customStyles}
                options={values}
                // if isUpdateField, the dot will provide the cancelable option
                isClearable={!isUpdateField && isClearable}
                noOptionsMessage={(obj: { inputValue: string }) =>
                    `${obj.inputValue} ${myLanguage("inputSelectSearchable.noOptionMessage")}`
                }
                form={refForm}
                placeholder={placeholder}
                defaultValue={values.filter((el) => el.value === defaultValue)}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(val, md): void => {
                    if (isUpdateField && val) {
                        if (val?.value !== state.previous) {
                            dispatch({ type: "UPDATING", payload: val?.value });
                        } else {
                            dispatch({ type: "CANCEL_UPDATE" });
                        }
                    } else {
                        val && dispatch({ type: "RESET", payload: val?.value });
                    }
                    if (setValue && val) {
                        setValue(refForm, val?.value);
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
