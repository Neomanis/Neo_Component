/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TemplateName from "./TemplateName";

export default {
    component: TemplateName,
    title: "TemplateName",
} as Meta;

const Template: ComponentStory<typeof TemplateName> = (args) => {
    return <TemplateName {...args} />;
};

export const Default: ComponentStory<typeof TemplateName> = Template.bind({});
Default.args = {
    title: "TemplateName",
};
