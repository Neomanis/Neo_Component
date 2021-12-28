import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Select, { GroupBase, MultiValue, StylesConfig } from "react-select";
import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";
import { i18n } from "../../../i18n";
import { customStyles } from "../../utils/inputSelectSearchableCss";

interface Props {
    containerClassName?: string;
    customStyleOverride?: StylesConfig<
        { label: string; value: number },
        boolean,
        GroupBase<{ label: string; value: number }>
    >;
    data: Array<{ label: string; value: number }>;
    defaultValue?: number | number[];
    doValueLogic?: boolean;
    dotPosition?: string;
    errorMessage?: string;
    id?: string;
    isClearable?: boolean;
    isError?: boolean;
    isMulti?: boolean;
    isSearchable: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    languageUser?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setStateValue?: (value: number) => void;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (field: string, value: number | number[]) => void;
}

const InputSelectSearchable = ({
    containerClassName,
    customStyleOverride,
    data,
    defaultValue,
    doValueLogic = true,
    dotPosition,
    errorMessage,
    isClearable = false,
    isError,
    isMulti = false,
    isSearchable = true,
    isUpdateField = false,
    label,
    labelClassName,
    languageUser = "en_US",
    placeholder,
    refForm,
    register,
    setStateValue,
    setValue,
    targetId,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
    const [state, dispatch] = useReducer(inputReducer, {
        stateFormated: data.find((el) => el.value === defaultValue),
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

    function handleOnChangeSimple(val: { value: number; label: string } | null): void {
        if (val && doValueLogic) {
            const newTracking = data.find((el) => el.value === val.value);
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
            setValue(refForm, val.value);
        }
        if (setStateValue && val) {
            setStateValue(val.value);
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
        const formatedState = data.filter((el) => valArrayNumber.includes(el.value));
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

    function overrideBaseCustomStyle(
        baseStyle: StylesConfig<{ label: string; value: number }, boolean, GroupBase<{ label: string; value: number }>>,
        customStyleOverride: StylesConfig<
            { label: string; value: number },
            boolean,
            GroupBase<{ label: string; value: number }>
        >
    ): StylesConfig<{ label: string; value: number }, boolean, GroupBase<{ label: string; value: number }>> {
        return { ...baseStyle, ...customStyleOverride };
    }

    useEffect(() => {
        register && register(refForm);
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
        <div className={containerClassName} data-testid="inputSelectSearchable-body">
            {label && <label className={labelClassName}>{label}</label>}
            <Select
                className="flex items-center w-full my-1 rounded-md text-xs font-bold"
                isSearchable={isSearchable}
                styles={overrideBaseCustomStyle(customStyles, customStyleOverride)}
                options={data}
                // if isUpdateField, the dot will provide the cancelable option
                isClearable={!isUpdateField && isClearable}
                noOptionsMessage={(obj: { inputValue: string }) =>
                    `${myLanguage("inputSelectSearchable.value")} ${obj.inputValue} ${myLanguage(
                        "inputSelectSearchable.noOptionMessage"
                    )}`
                }
                isMulti={isMulti}
                form={refForm}
                placeholder={placeholder ?? ""}
                defaultValue={
                    !isMulti && defaultValue
                        ? data.filter((el) => el.value === defaultValue)
                        : isMulti && defaultValue
                        ? data.filter((el) => (defaultValue as number[]).includes(el.value))
                        : []
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

            <div className="mx-3 w-9" data-testid="inputSelectSearchableDot-body">
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
                                    ? data.filter((el) => el.value === state.previous)
                                    : data.filter((el) => (state.previous as number[]).includes(el.value)),
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
