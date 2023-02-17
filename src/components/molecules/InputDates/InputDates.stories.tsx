/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputDates, { Dates } from "./InputDates";

export default {
    component: InputDates,
    title: "Molecules/InputDates",
} as Meta;

const Template: ComponentStory<typeof InputDates> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data: Dates) => {
        console.log({ startAt: data.startAt, displayAt: data.displayAt, endAt: data.endAt, hideAt: data.hideAt });
    };
    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="bg-neo-bg-A p-3 w-full">
            <InputDates {...args} formMethods={formMethods} updateFunction={(data) => console.log(data)} />
        </form>
    );
};
export const Default: ComponentStory<typeof InputDates> = Template.bind({});
Default.args = {
    watchType: "outage",
    isUpdate: false,
};
export const DefaultUpdate: ComponentStory<typeof InputDates> = Template.bind({});
DefaultUpdate.args = {
    watchType: "outage",
    isUpdate: true,
    defaultValues: {
        startAt: new Date("Thu Feb 16 2023 11:23:59"),
        displayAt: new Date("Thu Feb 14 2023 00:00:00"),
        endAt: undefined,
        hideAt: undefined,
    },
};
export const DefaultEvent: ComponentStory<typeof InputDates> = Template.bind({});
DefaultEvent.args = {
    watchType: "event",
    isUpdate: false,
};
