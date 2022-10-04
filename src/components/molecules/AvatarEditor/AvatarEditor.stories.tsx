/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AvatarEditor from "./AvatarEditor";

export default {
    component: AvatarEditor,
    title: "Molecules/AvatarEditor",
} as Meta;

const Template: ComponentStory<typeof AvatarEditor> = (args) => {
    return <AvatarEditor {...args} />;
};

export const Default: ComponentStory<typeof AvatarEditor> = Template.bind({});
Default.args = {
    editorWidth: 250,
};

export const WithStyle: ComponentStory<typeof AvatarEditor> = Template.bind({});
WithStyle.args = {
    editorWidth: 250,
    divEditorClassName: "border-2 border-neo-blue-modal p-8",
    dropZoneClassName: "flex flex-row text-center justify-between items-center",
};
