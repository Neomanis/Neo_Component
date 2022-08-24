/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputTextarea from "./InputTextarea";

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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-neo-bg-A">
            <InputTextarea
                {...args}
                setValue={setValue}
                register={register}
                refForm="exemple"
                isError={errors?.exemple && true}
            />
            <button>Submit</button>
        </form>
    );
};

export const Default: ComponentStory<typeof InputTextarea> = Template.bind({});
Default.args = {
    label: "Exemple",
    placeholder: "Exemple",
    required: true,
    errorMessage: "No text !",
    isUpdateField: true,
    classNames: {
        dot: "h-full",
        textArea: "w-full bg-neo-bg-B p-2 rounded-md shadow-md h-40",
        container: "flex items-center w-full relative",
        labelBody: "flex-1",
    },
    updateFunction: (refForm, value) => console.log(refForm, value),
};
