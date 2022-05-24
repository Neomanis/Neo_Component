import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TextEditor } from "../../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: TextEditor,
    title: "Atoms/Input/TextEditor",
} as Meta;

const Template: ComponentStory<typeof TextEditor> = (args) => {
    const { register, setValue, handleSubmit, watch } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-96 bg-neo-bg-A text-black p-5">
            <TextEditor {...args} register={register} setValue={setValue} watch={watch} refForm="content" />
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {
    required: false,
    className: "",
};

export const AreaUpdate = Template.bind({});
AreaUpdate.args = {
    isUpdateField: true,
    // eslint-disable-next-line no-console
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
    timerSetting: 3000,
    className: "h-full w-full",
    dotClassName: "flex justify-end mb-1 h-6",
    defaultValue: "<p>test</p>",
};
