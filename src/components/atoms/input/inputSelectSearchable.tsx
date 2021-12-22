import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";
import { i18n } from "../../..";

interface Props {
    data: Array<{ label: string; value: string }>;
    defaultValue?: number | number[];
    dotPosition?: string;
    errorMessage?: string;
    id?: string;
    isClearable?: boolean;
    isError?: boolean;
    isMulti?: boolean;
    isSearchable: boolean;
    isUpdateField?: boolean;
    languageUser?: string;
    placeholder: string;
    refForm: string;
    setStateValue?: (value: number) => void;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (field: string, value: number | number[]) => void;
}

const InputSelectSearchable = ({
    data,
    defaultValue,
    dotPosition,
    errorMessage,
    isClearable = false,
    isError,
    isMulti = false,
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
    const values = data.reduce<{ value: number; label: string }[]>((acc, curVal) => {
        acc.push({ value: parseInt(curVal.value), label: curVal.label });
        return acc;
    }, []);

    const [state, dispatch] = useReducer(inputReducer, {
        stateFormated: values.find((el) => el.value === defaultValue),
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultValue,
        timeoutId: undefined,
        trigger: false,
        updated: defaultValue,
    });

    const isLastMount = useRef(false);

    const myLanguage = i18n.getFixedT(languageUser);
    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        container: (provided, state) => ({
            ...provided,
            background: "#15304C",
            padding: 0,
            margin: 0,
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
        clearIndicator: (provided, state) => ({
            ...provided,
            display: "bloc",
            padding: 0,
            position: "absolute",
            right: 30,
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        option: (provided, state: { isSelected }) => ({
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        multiValue: (provided, state) => ({
            ...provided,
            color: "#DAE5E5",
            background: "#FF1166",
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        multiValueLabel: (provided, state) => ({
            ...provided,
            background: "#152535",
            color: "#DAE5E5",
        }),
    };

    function handleOnChangeSimple(val: { value: number; label: string } | null): void {
        if (val) {
            const newTracking = values.find((el) => el.value === val.value);
            dispatch({ type: "TRACK_STATE", payload: newTracking });
        } else {
            dispatch({ type: "TRACK_STATE", payload: null });
        }

        if (isUpdateField) {
            if (val?.value !== state.previous) {
                dispatch({ type: "UPDATING", payload: val?.value });
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        } else {
            dispatch({ type: "RESET", payload: val?.value });
        }
        if (setValue && val) {
            setValue(refForm, val?.value);
        }
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
        }
    }

    function handleChangeMulti(
        val: MultiValue<{
            value: number;
            label: string;
        }>
    ): void {
        const valArrayNumber = val.map((el) => el.value);
        const formatedState = values.filter((el) => valArrayNumber.includes(el.value));
        if (isUpdateField) {
            dispatch({ type: "TRACK_STATE", payload: formatedState });
            dispatch({ type: "UPDATING", payload: valArrayNumber });
        }
        if (setValue && val) {
            setValue(refForm, val);
        }
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
        }
    }

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
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
                    updateFunction(refForm, state.updated as number | number[]);
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
                isMulti={isMulti}
                form={refForm}
                placeholder={placeholder}
                defaultValue={
                    !isMulti
                        ? values.filter((el) => el.value === defaultValue)
                        : values.filter((el) => (defaultValue as number[]).includes(el.value))
                }
                value={state.stateFormated}
                closeMenuOnSelect={!isMulti}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(val, action): void => {
                    if (!isMulti) {
                        handleOnChangeSimple(val as { label: string; value: number });
                    } else {
                        handleChangeMulti(
                            val as MultiValue<{
                                value: number;
                                label: string;
                            }>
                        );
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
                            dispatch({
                                type: "TRACK_STATE",
                                payload: !isMulti
                                    ? values.filter((el) => el.value === state.previous)
                                    : values.filter((el) => (state.previous as number[]).includes(el.value)),
                            });
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
