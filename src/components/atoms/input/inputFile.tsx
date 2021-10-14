import React, { ReactElement } from "react";

interface Props {
    name: string;
    id?: string;
    required?: boolean;
    label?: string;
    accept?: string;
}

const InputFile = ({ accept, name, required, id, label }: Props): ReactElement => {
    return (
        <label className="">
            {label}
            <input className="" type="file" accept={accept} name={name} id={id} required={required} />
        </label>
    );
};

export default InputFile;
