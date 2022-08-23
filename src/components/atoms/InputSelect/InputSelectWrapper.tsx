import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import InputSelect from "./InputSelect";

const InputSelectWrapper = (): ReactElement => {
    const formMethods = useForm();
    return (
        <InputSelect
            formMethods={formMethods}
            options={[
                { label: "Shikamaru", value: "Shikamaru" },
                { label: "Naruto", value: "Naruto" },
            ]}
            refForm="inputSelect"
        />
    );
};

export default InputSelectWrapper;
