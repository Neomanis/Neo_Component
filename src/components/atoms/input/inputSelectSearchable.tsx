import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Select, { GroupBase, MultiValue, StylesConfig } from "react-select";
import inputReducer from "../../utils/reducers/inputReducer";
import { customStyles } from "../../utils/inputSelectSearchableCss";
import { IReactHookFormCustomValidation } from "../../../interface";
import Updater from "../updater";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { useTranslation } from "../../../i18n";

interface Props {
    containerClassName?: string;
    customComponents?: Partial<
        SelectComponents<
            {
                label: string;
                value: number;
            },
            boolean,
            GroupBase<{
                label: string;
                value: number;
            }>
        >
    >;
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
    customComponents,
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
    const { t } = useTranslation();
    useEffect(() => {
        register && register(refForm, { required: required && errorMessage, validate: { ...customValidation } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            setValue(refForm, selected?.value, { shouldValidate: true });
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
            setValue(refForm, values, { shouldValidate: true });
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
        setValue && setValue(refForm, defaultValue, { shouldValidate: true });
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
        <div className={containerClassName ? containerClassName : "w-full"} data-testid="inputSelectSearchable-body">
            {(isUpdateField || isError || label) && (
                <div className="h-6 flex justify-between items-center">
                    <label className={labelClassName ? labelClassName : "text-white"}>{label}</label>
                    <div className={`${dotClassName ? dotClassName : ""}`} data-testid="inputSelectSearchableDot-body">
                        {(isUpdateField || isError) && (
                            <Updater
                                errorMessage={errorMessage}
                                isCancelable={state.isCancelable}
                                isUpdate={state.isCooldown}
                                isError={isError}
                                isSuccess={state.isSuccess}
                                trigger={state.trigger}
                                fCallBackCancel={(): void => {
                                    if (setValue && state.previous) {
                                        setValue(refForm, state.previous, { shouldValidate: true });
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
                            />
                        )}
                    </div>
                </div>
            )}
            <Select
                className="flex items-center w-full rounded-md text-xs font-bold"
                isSearchable={isSearchable}
                styles={overrideBaseCustomStyle(customStyles, customStyleOverride)}
                options={data}
                // if isUpdateField, the dot will provide the cancelable option
                isClearable={!isUpdateField && isClearable}
                noOptionsMessage={(obj: { inputValue: string }) =>
                    `${t("inputSelectSearchable.value")} ${obj.inputValue} ${t(
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
                components={customComponents}
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
