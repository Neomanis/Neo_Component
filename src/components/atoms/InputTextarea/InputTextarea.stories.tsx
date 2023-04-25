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
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="bg-neo-bg-A p-4 h-40">
            <InputTextarea
                {...args}
                formMethods={formMethods}
                refForm="exemple"
                isError={formMethods.formState.errors?.exemple && true}
            />
        </form>
    );
};

export const Default: ComponentStory<typeof InputTextarea> = Template.bind({});
Default.args = {
    placeholder: "Exemple",
    required: true,
    errorMessage: "No text !",
    label: "label test",
    readOnly: false,
    isUpdateField: true,
    defaultValue: "test value",
    updateFunction: (refForm, value) => console.log(refForm, value),
};
