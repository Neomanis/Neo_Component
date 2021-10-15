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

export const pillDefault = Template.bind({});
pillDefault.args = {
    className: "",
    data: "17",
};
