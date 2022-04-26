import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { SwitchToggle } from "../..";

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

export const Default = Template.bind({});
Default.args = {
    defaultStatus: false,
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("switch"),
    value: "Exemple switch",
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    defaultStatus: true,
    labelClassName: "h-4 text-neo-green",
    uncheckBgColor: "neo-red",
    uncheckPillColor: "neo-red",
    checkBgColor: "neo-blue",
    checkPillColor: "neo-blue",
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("switch"),
    value: "Exemple switch with style",
};
