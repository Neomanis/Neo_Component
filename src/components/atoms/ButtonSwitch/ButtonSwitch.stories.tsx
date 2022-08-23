/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faWind, faAd } from "@fortawesome/free-solid-svg-icons";
import { ClockLogo, IconMaintenance } from "@/img/svg";
import ButtonSwitch from "./ButtonSwitch";

export default {
    component: ButtonSwitch,
    title: "Atoms/ButtonSwitch",
} as Meta;

const Template: ComponentStory<typeof ButtonSwitch> = (args) => {
    return <ButtonSwitch {...args} />;
};

export const Default: ComponentStory<typeof ButtonSwitch> = Template.bind({});
Default.args = {
    activeClassName: "flex bg-purple-500 text-white rounded px-1 hover:bg-red-500 px-2",
    activeData: "active",
    activeFontIcon: faWind,
    activeIconClassName: "",
    fCallback: () => console.log("click ! "),
    inactiveClassName: "flex bg-red-500 text-white rounded px-1 hover:bg-purple-500 px-2",
    inactiveData: "inactive",
    inactiveFontIcon: faAd,
    inactiveIconClassName: "",
    testId: "testId",
    type: "button",
};

export const DefaultSvg: ComponentStory<typeof ButtonSwitch> = Template.bind({});
DefaultSvg.args = {
    activeClassName: "flex bg-purple-500 text-white rounded px-1 hover:bg-red-500 px-2",
    activeData: "active",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
    inactiveClassName: "flex bg-red-500 text-white rounded px-1 hover:bg-purple-500 px-2",
    inactiveData: "inactive",
    inactiveSvg: <ClockLogo fill="#fff" />,
    activeSvg: <IconMaintenance fill="#fff" />,
    activeSvgClassName: "w-8",
    inactiveSvgClassName: "w-8",
    testId: "testId",
    type: "button",
};
