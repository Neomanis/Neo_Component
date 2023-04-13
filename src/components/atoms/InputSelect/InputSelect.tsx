import React, { ComponentProps, ComponentType, ReactElement, ReactNode, useEffect, useMemo, useRef } from "react";
import { UseFormReturn, useController } from "react-hook-form";
import Select, {
    GroupBase,
    SelectComponentsConfig,
    StylesConfig,
    OptionsOrGroups,
    GroupHeadingProps,
    components,
    FormatOptionLabelMeta,
    ActionMeta,
    MultiValueRemoveProps,
} from "react-select";
import isEqual from "lodash.isequal";
import { ReactHookFormCustomValidation } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";
import { useInputs } from "@/utils/hooks/useInputs";
import { baseStyles } from "@/utils/inputSelectCss";
import { createTimeout } from "@/utils/tools";
import Updater from "../Updater";

const CustomGroupHeading = ({ children, style, ...props }: GroupHeadingProps) => {
    return (
        <components.GroupHeading style={{ ...style, padding: "0.25rem" }} {...props}>
            <div className="flex justify-center text-xs">
                <hr className="self-center w-full mx-2 border-neo-link" />
                <div className="whitespace-nowrap">{children}</div>
                <hr className="self-center w-full mx-2 border-neo-link" />
            </div>
        </components.GroupHeading>
    );
};

type Value<Option, IsMulti extends boolean> = IsMulti extends true ? Option[] : Option;

export interface InputSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    containerClassName?: string;
    customComponents?: SelectComponentsConfig<Option, IsMulti, Group>;
    customStyles?: StylesConfig;
    customValidation?: ReactHookFormCustomValidation<Value<Option, IsMulti>>;
    defaultValue?: Value<Option, IsMulti>;
    forbidLastRemove?: boolean;
    formatOptionLabel?: (data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode;
    formMethods: UseFormReturn;
    isMulti?: IsMulti;
    isSearchable?: boolean;
    isUpdateField?: boolean;
    isClearable?: boolean;
    label?: string;
    labelClassName?: string;
    options: OptionsOrGroups<Option, Group>;
    onInputChange?: (newValue: string) => void;
    placeholder?: ReactNode;
    readOnly?: boolean;
    refForm: string;
    required?: boolean;
    showLabelAndUpdater?: boolean;
    updateFunction?: (field: string, value: Value<Option, IsMulti>) => void;
    updaterClassName?: string;
    id?: string;
    scrollTimeOut?: number;
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
    forbidLastRemove,
    formatOptionLabel,
    formMethods,
    isMulti,
    isSearchable,
    isUpdateField,
    isClearable,
    label,
    labelClassName,
    options,
    onInputChange,
    placeholder = "",
    readOnly,
    refForm,
    required,
    showLabelAndUpdater = true,
    updateFunction,
    updaterClassName,
    id,
    scrollTimeOut = 50,
}: InputSelectProps<Option, IsMulti, Group>): ReactElement {
    const timer = useRef<ReturnType<typeof createTimeout> | null>(null);
    const { t } = useTranslation();
    const [state, dispatch] = useInputs(defaultValue);
    const {
        field: { ref, value, onChange },
        formState: { errors },
    } = useController({
        control: formMethods.control,
        name: refForm,
        rules: { required, validate: { ...customValidation } },
        shouldUnregister: false,
        defaultValue,
    });

    const isError = Boolean(refForm.split(".").reduce((acc, value) => acc?.[value], errors));
    const styles = useMemo((): StylesConfig => {
        const style = {
            ...baseStyles,
            ...customStyles,
        };
        if (readOnly) {
            style.multiValueRemove = (provided) => ({
                ...provided,
                display: "none",
            });
            style.dropdownIndicator = (provided) => ({ ...provided, display: "none" });
        }
        return style;
    }, [readOnly, customStyles]);

    const CustomMultiValueRemove = ({ ...props }: MultiValueRemoveProps) => {
        if (forbidLastRemove && value.length === 1) return null;
        return <components.MultiValueRemove {...props} />;
    };

    function isGroupBase(option: unknown): option is GroupBase<Option> {
        return option && typeof option === "object" && Reflect.get(option, "options");
    }
    function findOptionCoordinates(options: OptionsOrGroups<Option, Group>, value: Option): number[] {
        return options.reduce((acc: number[], option, index) => {
            if (isGroupBase(option)) {
                const result = findOptionCoordinates(option.options, value);
                result.length && acc.push(index, ...result);
            } else {
                isEqual(option, value) && acc.push(index);
            }
            return acc;
        }, []);
    }

    function scrollToOption(options: OptionsOrGroups<Option, Group>, value: Option, selectId: string) {
        const indexes = findOptionCoordinates(options, value);
        if (indexes.length) {
            const elementId = `react-select-${selectId}-option-${indexes.join("-")}`;
            setTimeout(() => {
                const option = document.getElementById(elementId);
                const y = option.getBoundingClientRect().top + window.pageYOffset;
                const x = option.getBoundingClientRect().left + window.pageXOffset;
                option?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
                window.scrollTo({ top: y, left: x, behavior: "smooth" });
            }, scrollTimeOut);
        }
    }

    function handleChange(val: Value<Option, IsMulti>, actionMeta: ActionMeta<Option>) {
        if (forbidLastRemove && actionMeta.action === "remove-value" && value.length === 1) {
            return;
        }
        onChange(val);
        if (isUpdateField) {
            timer.current?.clear();
            if (!isEqual(val, state.previous)) {
                dispatch({ type: "UPDATING", payload: val });
                timer.current = createTimeout(() => {
                    updateFunction?.(refForm, val);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = createTimeout(() => {
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
        formMethods.setValue(refForm, defaultValue === undefined ? null : defaultValue, { shouldValidate: false });
    }, [defaultValue]);

    useEffect(() => {
        return () => {
            timer.current?.trigger();
        };
    }, []);

    return (
        <div className={containerClassName ? containerClassName : "w-full"}>
            {showLabelAndUpdater && (
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
                                    timer.current?.clear();
                                    dispatch({ type: "CANCEL_UPDATE" });
                                    onChange(state.previous);
                                }}
                                id={"updater-" + id}
                            />
                        )}
                    </div>
                </div>
            )}
            <Select
                isDisabled={readOnly}
                className="flex items-center w-full rounded-md text-xs font-bold"
                closeMenuOnSelect={!isMulti}
                components={{
                    GroupHeading: CustomGroupHeading,
                    MultiValueRemove: CustomMultiValueRemove,
                    ...customComponents,
                }}
                formatOptionLabel={formatOptionLabel}
                isMulti={isMulti}
                isSearchable={isSearchable}
                menuPlacement="auto"
                onChange={handleChange}
                onMenuOpen={() => scrollToOption(options, value, id)}
                options={options}
                placeholder={placeholder}
                ref={ref}
                styles={styles}
                value={value}
                onInputChange={(newValue) => onInputChange && onInputChange(newValue)}
                id={id}
                instanceId={id}
                isClearable={isClearable}
            />
        </div>
    );
}

const typedMemo: <T extends ComponentType<ComponentProps<typeof InputSelect>>>(c: T) => T = React.memo;
export default typedMemo(InputSelect);
