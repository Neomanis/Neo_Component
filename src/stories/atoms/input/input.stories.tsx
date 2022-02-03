import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Input } from "../../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: Input,
    title: "Atoms/Input/InputDefault",
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-neo-bg-A p-3">
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

export const InputDefault = Template.bind({});
InputDefault.args = {
    inputClassName: "bg-neo-bg-B p-2 rounded text-white mr-2",
    // eslint-disable-next-line no-console
    required: true,
    errorMessage: "error",
    typeInput: "input",
    placeholder: "Default Input",
    isUpdateField: true,
};
