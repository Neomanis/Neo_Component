/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Dropzone from "./Dropzone";
import { useDropzone } from "react-dropzone";

export default {
    component: Dropzone,
    title: "Atoms/Dropzone",
} as Meta;

const Template: ComponentStory<typeof Dropzone> = (args) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone();
    return (
        <div className="h-52 w-60">
            <Dropzone {...args} getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
        </div>
    );
};

export const Default: ComponentStory<typeof Dropzone> = Template.bind({});
Default.args = {};
