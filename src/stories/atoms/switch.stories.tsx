import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { SwitchToggle } from "../..";

export default {
    title: "Atoms/SwitchToggle",
    component: SwitchToggle,
} as Meta;

const Template: ComponentStory<typeof SwitchToggle> = (args) => <SwitchToggle {...args} />;

export const Default = Template.bind({});
Default.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("switch"),
    value: "Exemple switch",
    defaultStatus: true,
};
