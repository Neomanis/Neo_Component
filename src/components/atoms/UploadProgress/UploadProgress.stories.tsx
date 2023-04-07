/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import UploadProgress from "./UploadProgress";

export default {
    component: UploadProgress,
    title: "Atoms/UploadProgress",
} as Meta;

const Template: ComponentStory<typeof UploadProgress> = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((old) => (old === 100 ? 0 : old + 1));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="w-2/3">
            <UploadProgress uploadProgress={progress} />
        </div>
    );
};

export const Default: ComponentStory<typeof UploadProgress> = Template.bind({});
