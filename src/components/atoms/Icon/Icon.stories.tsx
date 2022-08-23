/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";

import Icon from "./Icon";
import { IconFullStar } from "@/img/svg";

export default {
    component: Icon,
    title: "Atoms/Icon",
} as Meta;

const Template: ComponentStory<typeof Icon> = (args) => {
    return <Icon {...args} />;
};

export const Default: ComponentStory<typeof Icon> = Template.bind({});
Default.args = {
    fontIcon: faCog,
};

export const iconLink: ComponentStory<typeof Icon> = Template.bind({});
iconLink.args = {
    fontIcon: faCog,
    type: "iconLink",
};

export const iconPlaceholderInput: ComponentStory<typeof Icon> = Template.bind({});
iconPlaceholderInput.args = {
    fontIcon: faCog,
    type: "placeholderInput",
};

export const iconNotification: ComponentStory<typeof Icon> = Template.bind({});
iconNotification.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => true,
    fontIcon: faBell,
    type: "iconWithRedDot",
    redDot: true,
    className: "relative w-10",
};

export const svgDefault: ComponentStory<typeof Icon> = Template.bind({});
svgDefault.args = {
    svg: <IconFullStar />,
};

export const svgLink: ComponentStory<typeof Icon> = Template.bind({});
svgLink.args = {
    svg: <IconFullStar />,
    type: "iconLink",
};

export const svgPlaceholderInput: ComponentStory<typeof Icon> = Template.bind({});
svgPlaceholderInput.args = {
    svg: <IconFullStar />,
    type: "placeholderInput",
};

export const svgNotification: ComponentStory<typeof Icon> = Template.bind({});
svgNotification.args = {
    fCallBack: () => console.log("clicked"),
    svg: <IconFullStar />,
    type: "iconWithRedDot",
};
