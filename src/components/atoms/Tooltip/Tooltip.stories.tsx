/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Icon from "../Icon";
import Tooltip from "./Tooltip";

export default {
    component: Tooltip,
    title: "Atoms/Tooltip",
} as Meta;

const Template: ComponentStory<typeof Tooltip> = (args) => {
    return (
        <Tooltip {...args}>
            <Icon fontIcon={faExclamationCircle} className="text-white p-1" />
        </Tooltip>
    );
};

export const Default: ComponentStory<typeof Tooltip> = Template.bind({});
Default.args = {
    text: "test text",
    fontIcon: faExclamationCircle,
    position: "bottom",
};
export const DefaultTextComponent: ComponentStory<typeof Tooltip> = Template.bind({});
DefaultTextComponent.args = {
    textComponent: (
        <div className="flex">
            <p>test 1 </p> <p>test 2</p>
        </div>
    ),
    fontIcon: faExclamationCircle,
    position: "bottom",
};

export const tooltipComponentBottom = Template.bind({});
tooltipComponentBottom.args = {
    text: "test textj cdjsj cjdsjcdj jdcjs gkfrk gfkd kfkdkfkdkfk k kdkfgkj",
    position: "bottom",
};
