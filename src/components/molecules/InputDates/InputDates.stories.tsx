/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputDates from "./InputDates";

export default {
    component: InputDates,
    title: "Molecules/InputDates",
} as Meta;

const Template: ComponentStory<typeof InputDates> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="bg-neo-bg-A p-3 w-full">
            <InputDates {...args} formMethods={formMethods} />
        </form>
    );
};

export const Default: ComponentStory<typeof InputDates> = Template.bind({});
Default.args = {
    watchType: "outage",
    isUpdate: true,
};
