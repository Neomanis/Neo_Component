/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TimeSpentInput from "./TimeSpentInput";
import { useForm } from "react-hook-form";

export default {
    component: TimeSpentInput,
    title: "Molecules/TimeSpentInput",
} as Meta;

const Template: ComponentStory<typeof TimeSpentInput> = (args) => {
    const formMethods = useForm();

    return <TimeSpentInput {...args} formMethods={formMethods} refForm="timeSpent" />;
};

export const Default: ComponentStory<typeof TimeSpentInput> = Template.bind({});
Default.args = {
    defaultValue: 20160,
    updateFunction: (_, value) => console.log(value),
};

export const Disabled: ComponentStory<typeof TimeSpentInput> = Template.bind({});
Disabled.args = {
    defaultValue: 20160,
    updateFunction: (_, value) => console.log(value),
    disabled: true,
};
