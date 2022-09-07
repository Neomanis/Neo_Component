/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Input from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";

export default {
    component: Input,
    title: "Atoms/Input/Input",
} as Meta;

const Template: ComponentStory<typeof Input> = (args) => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...args}
                register={register}
                setValue={setValue}
                refForm="exemple"
                isError={errors?.exemple && true}
            />
            <button>Submit</button>
        </form>
    );
};
export const Default: ComponentStory<typeof Input> = Template.bind({});
Default.args = {
    inputClassName: "bg-neo-bg-B p-2 rounded text-white mr-2",
    required: true,
    errorMessage: "error",
    typeInput: "input",
    placeholder: "Default Input",
    isUpdateField: true,
    readOnly: false,
    defaultValue: "text",
};
export const ReadOnly: ComponentStory<typeof Input> = Template.bind({});
ReadOnly.args = {
    inputClassName: "bg-neo-bg-B p-2 rounded text-white mr-2",
    required: true,
    errorMessage: "error",
    typeInput: "input",
    placeholder: "Default Input",
    isUpdateField: true,
    readOnly: true,
    defaultValue: "text ReadOnly",
};
