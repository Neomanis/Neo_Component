import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import InputTextarea from "./InputTextarea";

const InputTextAreaWrapper = (): ReactElement => {
    const formMethods = useForm();
    return <InputTextarea refForm="inputSelect" formMethods={formMethods} />;
};

export default InputTextAreaWrapper;
