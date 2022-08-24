import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import InputTextarea from "./InputTextarea";

const InputTextAreaWrapper = (): ReactElement => {
    const { setValue, register } = useForm();
    return <InputTextarea refForm="inputSelect" setValue={setValue} register={register} />;
};

export default InputTextAreaWrapper;
