/* eslint-disable no-console */
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import InputDates from "./InputDates";

const InputDatesWrapper = (): ReactElement => {
    const formMethods = useForm();
    return <InputDates formMethods={formMethods} />;
};

export default InputDatesWrapper;
