import React, { ReactElement, ChangeEvent } from "react";

interface Props {
    data?: string;
    fCallBack?: (e: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    name?: string;
    testId?: string;
}

const Checkbox = ({ data, fCallBack, checked, name, testId }: Props): ReactElement => {
    return (
        <>
            <input
                id={name}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={fCallBack}
                className="cursor-pointer"
                data-testid={testId}
            />
            <label htmlFor={name} className="mx-2 cursor-pointer">
                {data}
            </label>
        </>
    );
};

export default Checkbox;
