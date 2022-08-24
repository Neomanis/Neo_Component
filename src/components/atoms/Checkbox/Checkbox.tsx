import React, { ChangeEvent, ReactElement } from "react";

export interface CheckboxProps {
    checked?: boolean;
    data?: string;
    fCallBack?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    testId?: string;
    classNameInput?: string;
    classNameLabel?: string;
}

const Checkbox = ({
    checked,
    data,
    fCallBack,
    name,
    testId,
    classNameInput,
    classNameLabel,
}: CheckboxProps): ReactElement => {
    return (
        <>
            <input
                checked={checked}
                className={classNameInput}
                data-testid={testId}
                id={name}
                name={name}
                onChange={fCallBack}
                type="checkbox"
            />
            <label htmlFor={name} className={classNameLabel} data-testid="checkBox-label">
                {data}
            </label>
        </>
    );
};

export default Checkbox;
