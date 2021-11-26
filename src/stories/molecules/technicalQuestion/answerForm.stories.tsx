/* eslint-disable no-console */
import React from "react";
import { AnswerForm } from "../../..";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/TechnicalQuestion/AnswerForm",
    component: AnswerForm,
} as Meta;

const Template: ComponentStory<typeof AnswerForm> = (args) => {
    return (
        <div className=" bg-neo-bg-B p-2">
            <AnswerForm {...args} />
        </div>
    );
};

export const AnswerFormDefault = Template.bind({});
AnswerFormDefault.args = {
    closeCallback: () => console.log("yo"),
    isUpdateField: false,
};
