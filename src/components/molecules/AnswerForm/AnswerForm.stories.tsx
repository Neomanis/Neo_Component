/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AnswerForm from "./AnswerForm";

export default {
    component: AnswerForm,
    title: "Molecules/TechnicalQuestion/AnswerForm",
} as Meta;

const Template: ComponentStory<typeof AnswerForm> = (args) => {
    return <AnswerForm {...args} />;
};

export const Default: ComponentStory<typeof AnswerForm> = Template.bind({});
Default.args = {
    isUpdateField: false,
};
