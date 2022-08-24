/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NeoBotProcess from "./NeoBotProcess";

export default {
    component: NeoBotProcess,
    title: "Molecules/Chat/NeoBotProcess",
} as Meta;

const Template: ComponentStory<typeof NeoBotProcess> = (args) => {
    return (
        <div className="flex items-center flex-col w-72" style={{ height: "470px" }}>
            <NeoBotProcess {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof NeoBotProcess> = Template.bind({});
Default.args = {
    className: "",
    message: "Processing",
    showEllipsis: true,
};
