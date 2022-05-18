import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Pill } from "../..";

export default {
    component: Pill,
    title: "Atoms/Pill",
} as Meta;

const Template: ComponentStory<typeof Pill> = (args) => {
    return (
        <div className="p-2 flex items-center w-1/4">
            <Pill {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: "17",
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    className: "text-xs ml-2 rounded-full text-neo-bg-A bg-neo-link font-bold p-2",
    data: "17",
};
