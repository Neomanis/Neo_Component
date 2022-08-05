import React, { ComponentProps, ComponentType, ReactElement, ReactNode, useEffect, useRef } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import Select, { GroupBase, OptionsOrGroups, SelectComponentsConfig, StylesConfig } from "react-select";
import isEqual from "lodash.isequal";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";
import { baseStyles } from "../../utils/inputSelectCss";
import { useInputs } from "../../utils/hooks/useInputs";
import Updater from "../updater";

type Value<Option, IsMulti extends boolean> = IsMulti extends true ? Option[] : Option;

interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    containerClassName?: string;
    customComponents?: SelectComponentsConfig<Option, IsMulti, Group>;
    customStyles?: StylesConfig;
    customValidation?: ReactHookFormCustomValidation<Value<Option, IsMulti>>;
    defaultValue?: Value<Option, IsMulti>;
    formatOptionLabel?: (data: Option) => ReactNode;
    formMethods: UseFormReturn;
    isMulti?: IsMulti;
    isSearchable?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    options: OptionsOrGroups<Option, Group>;
    onInputChange?: (newValue: string) => void;
    placeholder?: ReactNode;
    refForm: string;
    required?: boolean;
    updateFunction?: (field: string, value: Value<Option, IsMulti>) => void;
    updaterClassName?: string;
}

function InputSelect<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>({
    containerClassName,
    customComponents,
    customStyles,
    customValidation,
    defaultValue,
    formatOptionLabel,
    formMethods,
    isMulti,
    isSearchable,
    isUpdateField,
    label,
    labelClassName,
    options,
    onInputChange,
    placeholder = "",
    refForm,
    required,
    updateFunction,
    updaterClassName,
}: Props<Option, IsMulti, Group>): ReactElement {
    const timer = useRef(null);
    const { t } = useTranslation();
    const [state, dispatch] = useInputs(defaultValue);
    const {
        field: { ref, value, onChange },
        formState: { errors },
    } = useController({
        control: formMethods.control,
        name: refForm,
        rules: { required, validate: { ...customValidation } },
        shouldUnregister: true,
        defaultValue,
    });

    const isError = Boolean(errors?.[refForm]);

    function handleChange(value: Value<Option, IsMulti>) {
        onChange(value);
        if (isUpdateField) {
            clearTimeout(timer.current);
            if (!isEqual(value, state.previous)) {
                dispatch({ type: "UPDATING", payload: value });
                timer.current = setTimeout(() => {
                    updateFunction(refForm, value);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, 5000);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        }
    }

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        onChange(defaultValue === undefined ? null : defaultValue);
    }, [defaultValue]);

    return (
        <div className={containerClassName ? containerClassName : "w-full"}>
            {(isUpdateField || isError || label) && (
                <div className="h-6 flex justify-between items-center">
                    <label className={labelClassName ? labelClassName : "text-white"}>{label}</label>
                    <div
                        className={`${updaterClassName ? updaterClassName : ""}`}
                        data-testid="inputSelectUpdater-body"
                    >
                        {(isUpdateField || isError) && (
                            <Updater
                                errorMessage={t("error.required")}
                                isCancelable={state.isCancelable}
                                isError={isError}
                                isSuccess={state.isSuccess}
                                isUpdate={state.isCooldown}
                                trigger={state.trigger}
                                fCallBackCancel={(): void => {
                                    clearTimeout(timer.current);
                                    dispatch({ type: "CANCEL_UPDATE" });
                                    onChange(state.previous);
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
            <Select
                className="flex items-center w-full rounded-md text-xs font-bold"
                closeMenuOnSelect={!isMulti}
                components={customComponents}
                formatOptionLabel={formatOptionLabel}
                isMulti={isMulti}
                isSearchable={isSearchable}
                menuPlacement="auto"
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
                ref={ref}
                styles={{ ...baseStyles, ...customStyles }}
                value={value}
                onInputChange={(newValue) => onInputChange && onInputChange(newValue)}
            />
        </div>
    );
}

const typedMemo: <T extends ComponentType<ComponentProps<typeof InputSelect>>>(c: T) => T = React.memo;
export default typedMemo(InputSelect);
