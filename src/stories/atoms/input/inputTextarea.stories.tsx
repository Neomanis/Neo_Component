import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputTextarea } from "../../../components/atoms";

export default {
    component: InputTextarea,
    title: "Atoms/Input/InputTextarea",
} as Meta;

const Template: ComponentStory<typeof InputTextarea> = (args) => <InputTextarea {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Exemple",
    placeholder: "Exemple",
    refForm: "exempleArea",
    required: false,
    classNames: {
        dot: "self-start mt-2 ml-2",
        textArea: "w-full bg-neo-bg-B p-2 rounded-md shadow-md h-40",
        container: "flex items-center w-full",
        labelBody: "flex-1",
    },
};
