import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Select, { GroupBase, MultiValue, StylesConfig } from "react-select";
import inputReducer from "../../utils/reducers/inputReducer";
import { i18n } from "../../../i18n";
import { customStyles } from "../../utils/inputSelectSearchableCss";
import { IReactHookFormCustomValidation } from "../../../interface";
import InfoDot from "../infoDot";

interface Props {
    containerClassName?: string;
    customStyleOverride?: StylesConfig<
        { label: string; value: number },
        boolean,
        GroupBase<{ label: string; value: number }>
    >;
    customValidation?: IReactHookFormCustomValidation<number | number[]>;
    data: Array<{ label: string; value: number }>;
    defaultValue?: number | number[];
    doValueLogic?: boolean;
    dotClassName?: string;
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
    required?: boolean;
    setStateValue?: (value: number) => void;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number;
    timerSetting?: number;
    updateFunction?: (field: string, value: number | number[]) => void;
}

const InputSelectSearchable = ({
    containerClassName,
    customStyleOverride,
    customValidation,
    data,
    defaultValue,
    doValueLogic = true,
    dotClassName,
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
    required = false,
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
    const inputRegister =
        register && register(refForm, { required: required && errorMessage, validate: { ...customValidation } });

    function handleOnChangeSimple(selected: { value: number; label: string } | null): void {
        if (selected && doValueLogic) {
            dispatch({ type: "TRACK_STATE", payload: selected });
        } else {
            dispatch({ type: "TRACK_STATE", payload: null });
        }

        if (isUpdateField) {
            if (selected?.value !== state.previous) {
                dispatch({ type: "UPDATING", payload: selected?.value });
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        } else {
            dispatch({ type: "RESET", payload: selected?.value });
        }
        if (setValue) {
            setValue(refForm, selected?.value);
        }
        if (setStateValue) {
            setStateValue(selected?.value);
        }
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
        }
    }

    function handleChangeMulti(
        selecteds: MultiValue<{
            value: number;
            label: string;
        }>
    ): void {
        const values = selecteds.map((el) => el.value);
        if (isUpdateField) {
            dispatch({ type: "TRACK_STATE", payload: selecteds });
            dispatch({ type: "UPDATING", payload: values });
        }
        if (setValue) {
            setValue(refForm, values);
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
            <div className="flex justify-between">
                <label className={labelClassName}>{label}</label>
                <div className={`${dotClassName}`} data-testid="inputSelectSearchableDot-body">
                    {(isUpdateField || isError) && (
                        <InfoDot
                            isCancelable={state.isCancelable}
                            isUpdate={state.isCooldown}
                            isError={isError}
                            isSuccess={state.isSuccess}
                            fCallBackCancel={(): void => {
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
                            trigger={state.trigger}
                        />
                    )}
                </div>
            </div>
            <Select
                {...inputRegister}
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
                menuPlacement="auto"
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
        </div>
    );
};

export default InputSelectSearchable;
