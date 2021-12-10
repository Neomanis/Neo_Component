import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faWind, faAd } from "@fortawesome/free-solid-svg-icons";
import { ButtonSwitch, ClockLogo, IconMaintenance } from "../..";
export default {
    argTypes: {
        testId: {
            name: "testId",
            type: { name: "string", require: false },
            defaultValue: null,
            description: "you can use this ID for test in jest",
            table: {
                type: { summary: "string" },
            },
        },
        type: {
            name: "type",
            type: { name: "string", require: true },
            defaultValue: null,
            description: "you can select type of html button",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "type input by default is button" },
            },
        },
    },
    component: ButtonSwitch,
    title: "Atoms/ButtonSwitch",
} as Meta;

const Template: ComponentStory<typeof ButtonSwitch> = (args) => <ButtonSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {
    activeClassName: "flex bg-purple-500 text-white rounded px-1 hover:bg-red-500",
    activeData: "active",
    activeFontIcon: faWind,
    activeIconClassName: "",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
    inactiveClassName: "flex bg-red-500 text-white rounded px-1 hover:bg-purple-500",
    inactiveData: "inactive",
    inactiveFontIcon: faAd,
    inactiveIconClassName: "",
    testId: "testId",
    type: "button",
};

export const DefaultSvg = Template.bind({});
DefaultSvg.args = {
    activeClassName: "flex bg-purple-500 text-white rounded px-1 hover:bg-red-500",
    activeData: "active",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
    inactiveClassName: "flex bg-red-500 text-white rounded px-1 hover:bg-purple-500",
    inactiveData: "inactive",
    inactiveSvg: <ClockLogo fill="#fff" />,
    activeSvg: <IconMaintenance fill="#fff" />,
    activeSvgClassName: "w-8",
    inactiveSvgClassName: "w-8",
    testId: "testId",
    type: "button",
};
