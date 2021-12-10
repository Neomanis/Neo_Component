import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TextEditor } from "../../../components/atoms";

export default {
    component: TextEditor,
    title: "Atoms/Input/TextEditor",
} as Meta;

const Template: ComponentStory<typeof TextEditor> = (args) => (
    <div className="w-full h-96 bg-neo-bg-A text-black">
        <TextEditor {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    refForm: "content",
    required: false,
    className: "",
};

export const AreaUpdate = Template.bind({});
AreaUpdate.args = {
    isUpdateField: true,
    refForm: "content",
    required: false,
    // eslint-disable-next-line no-console
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
    timerSetting: 3000,
    className: "h-full w-full",
};
