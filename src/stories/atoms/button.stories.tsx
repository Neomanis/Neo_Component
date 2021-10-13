import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Button } from "../..";
import { faWind } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "Atoms/Button",
    component: Button,
} as Meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "Default",
    disabled: true,
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "button",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
};
export const Submit = Template.bind({});
Submit.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "submit",
    disabled: true,
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "submit",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
};
export const Reset = Template.bind({});
Reset.args = {
    className: "flex bg-purple-600 text-white rounded px-1",
    data: "Reset",
    disabled: true,
    fontIcon: faWind,
    iconClassName: "ml-2",
    testId: "testId",
    type: "reset",
    // eslint-disable-next-line no-console
    fCallback: () => console.log("click ! "),
};
