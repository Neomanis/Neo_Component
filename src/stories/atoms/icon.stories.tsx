import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../..";

export default {
    component: Icon,
    title: "Atoms/Icon",
} as Meta;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const iconDefault = Template.bind({});
iconDefault.args = {
    fontIcon: faCog,
};
export const iconLink = Template.bind({});
iconLink.args = {
    fontIcon: faCog,
    type: "iconLink",
};
export const iconPlaceholderInput = Template.bind({});
iconPlaceholderInput.args = {
    fontIcon: faCog,
    type: "placeholderInput",
};
export const iconNotification = Template.bind({});
iconNotification.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => true,
    fontIcon: faBell,
    type: "iconWithRedDot",
};
