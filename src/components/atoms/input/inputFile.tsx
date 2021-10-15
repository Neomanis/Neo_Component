import React, { ReactElement } from "react";

interface Props {
    accept?: string;
    id?: string;
    label?: string;
    name: string;
    required?: boolean;
}

const InputFile = ({ accept, id, label, name, required }: Props): ReactElement => {
    return (
        <label className="">
            {label}
            <input className="" type="file" accept={accept} name={name} id={id} required={required} />
        </label>
    );
};

export default InputFile;
