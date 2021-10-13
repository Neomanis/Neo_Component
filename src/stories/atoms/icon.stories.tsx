import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Icon } from "../..";

/**import icon for fontawesome */

import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "Atoms/Icon",
    component: Icon,
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
    fontIcon: faBell,
    type: "iconWithRedDot",
    // eslint-disable-next-line no-console
    fCallBack: () => true,
};
