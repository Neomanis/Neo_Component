/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import SwitchToggle from "./SwitchToggle";

export default {
    component: SwitchToggle,
    title: "Atoms/SwitchToggle",
} as Meta;

const Template: ComponentStory<typeof SwitchToggle> = (args) => {
    return (
        <>
            <SwitchToggle {...args} id={"test"} />
            <SwitchToggle {...args} id={"test2"} />
            <SwitchToggle {...args} id={"test3"} />
        </>
    );
};

export const Default: ComponentStory<typeof SwitchToggle> = Template.bind({});
Default.args = {
    defaultStatus: false,
    fCallBack: () => console.log("switch"),
    value: "Exemple switch",
    disabled: false,
};

export const WithStyle: ComponentStory<typeof SwitchToggle> = Template.bind({});
WithStyle.args = {
    defaultStatus: true,
    labelClassName: "h-4 text-neo-green",
    uncheckBgColor: "neo-red",
    uncheckPillColor: "neo-red",
    checkBgColor: "neo-blue",
    checkPillColor: "neo-blue",
    fCallBack: () => console.log("switch"),
    value: "Exemple switch with style",
    disabled: false,
};
