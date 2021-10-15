/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faWind } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../..";

export default {
    component: Button,
    title: "Atoms/Button",
} as Meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "Default",
    disabled: true,
    fCallback: () => console.log("click ! "),
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "button",
};
export const Submit = Template.bind({});
Submit.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "submit",
    disabled: true,
    fCallback: () => console.log("click ! "),
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "submit",
};
export const Reset = Template.bind({});
Reset.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "Reset",
    disabled: true,
    fCallback: () => console.log("click ! "),
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "reset",
};
