import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";

import { Icon, IconFullStar } from "../..";

export default {
    component: Icon,
    title: "Atoms/Icon",
} as Meta;

const Template: ComponentStory<typeof Icon> = (args) => (
    <div className="">
        <Icon {...args} />
    </div>
);

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
    redDot: true,
    className: "relative w-10",
};

export const svgDefault = Template.bind({});
svgDefault.args = {
    svg: <IconFullStar />,
};
export const svgLink = Template.bind({});
svgLink.args = {
    svg: <IconFullStar />,
    type: "iconLink",
};
export const svgPlaceholderInput = Template.bind({});
svgPlaceholderInput.args = {
    svg: <IconFullStar />,
    type: "placeholderInput",
};
export const svgNotification = Template.bind({});
svgNotification.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => true,
    svg: <IconFullStar />,
    type: "iconWithRedDot",
};
