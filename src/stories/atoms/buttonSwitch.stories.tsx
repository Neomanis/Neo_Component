import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { ButtonSwitch } from "../..";
import { faWind, faAd } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "Atoms/ButtonSwitch",
    component: ButtonSwitch,
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
} as Meta;

const Template: ComponentStory<typeof ButtonSwitch> = (args) => <ButtonSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {
    testId: "testId",
    type: "button",
    activeClassName: "flex bg-purple-500 text-white rounded px-1 hover:bg-red-500",
    inactiveClassName: "flex bg-red-500 text-white rounded px-1 hover:bg-purple-500",
    activeIconClassName: "",
    inactiveIconClassName: "",
    activeData: "active",
    inactiveData: "inactive",
    activeFontIcon: faWind,
    inactiveFontIcon: faAd,
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
};
