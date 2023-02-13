/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputTextarea from "./InputTextarea";
import { useForm, SubmitHandler } from "react-hook-form";

export default {
    component: InputTextarea,
    title: "Atoms/InputTextarea",
} as Meta;

const Template: ComponentStory<typeof InputTextarea> = (args) => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-neo-bg-A p-4 h-96">
            <InputTextarea
                {...args}
                setValue={setValue}
                register={register}
                refForm="exemple"
                isError={errors?.exemple && true}
            />
        </form>
    );
};

export const Default: ComponentStory<typeof InputTextarea> = Template.bind({});
Default.args = {
    placeholder: "Exemple",
    required: true,
    errorMessage: "No text !",

    readOnly: false,
    updateFunction: (refForm, value) => console.log(refForm, value),
};
