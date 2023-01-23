/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputAttachments from "./InputAttachments";

export default {
    component: InputAttachments,
    title: "Molecules/InputAttachments",
} as Meta;

const Template: ComponentStory<typeof InputAttachments> = (args) => {
    const [filesSend, setFilesSend] = useState<
        {
            title: string;
            file: File;
        }[]
    >([]);
    return (
        <div>
            <div className="flex">
                <p className="mr-2">files send : </p>
                <ul>
                    {filesSend.map((item, key) => (
                        <li key={key}>{item.title}</li>
                    ))}
                </ul>
            </div>

            <div className="w-[600px] h-[600px]">
                <InputAttachments {...args} sendFilesArray={(data) => setFilesSend(data)} />
            </div>
        </div>
    );
};

export const Default: ComponentStory<typeof InputAttachments> = Template.bind({});
Default.args = {};
