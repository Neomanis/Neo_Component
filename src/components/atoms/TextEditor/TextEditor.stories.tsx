/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { SubmitHandler, useForm } from "react-hook-form";

import TextEditor from "./TextEditor";

export default {
    component: TextEditor,
    title: "Atoms/Input/TextEditor",
} as Meta;

const Template: ComponentStory<typeof TextEditor> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full h-96 bg-neo-bg-A text-black p-5">
            <TextEditor {...args} formMethods={formMethods} refForm="content" />
        </form>
    );
};

export const Default: ComponentStory<typeof TextEditor> = Template.bind({});
Default.args = {
    required: false,
    className: "",
    readOnly: false,
};

export const AreaUpdate = Template.bind({});
AreaUpdate.args = {
    label: "test",
    isUpdateField: true,
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
    timerSetting: 3000,
    className: "h-full w-full",
    dotClassName: "flex mb-1 h-6 justify-between text-white font-bold",
    defaultValue: "<p>test</p>",
    readOnly: false,
};
