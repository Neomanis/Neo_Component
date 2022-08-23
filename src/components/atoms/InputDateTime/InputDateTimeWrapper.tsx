/* eslint-disable no-console */
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import InputDateTime from "./InputDateTime";

const InputDateTimeWrapper = (): ReactElement => {
    const formMethods = useForm();
    return (
        <InputDateTime
            defaultValue={new Date()}
            refForm="date"
            formMethods={formMethods}
            updateFunction={(refField, data) => console.log(refField, data)}
        />
    );
};

export default InputDateTimeWrapper;
