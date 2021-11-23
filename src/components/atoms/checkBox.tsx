import React, { ReactElement, ChangeEvent } from "react";

interface Props {
    checked?: boolean;
    data?: string;
    fCallBack?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    testId?: string;
    classNameInput?: string;
    classNameLabel?: string;
}

const Checkbox = ({ checked, data, fCallBack, name, testId, classNameInput, classNameLabel }: Props): ReactElement => {
    return (
        <>
            <input
                checked={checked}
                className={`cursor-pointer ${classNameInput}`}
                data-testid={testId}
                id={name}
                name={name}
                onChange={fCallBack}
                type="checkbox"
            />
            <label htmlFor={name} className={`mx-2 cursor-pointer ${classNameLabel}`}>
                {data}
            </label>
        </>
    );
};

export default Checkbox;
