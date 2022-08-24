/* eslint-disable no-console */
import React, { useRef } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ShadowBoxWrapper from "./ShadowBoxWrapper";

export default {
    component: ShadowBoxWrapper,
    title: "Molecules/ShadowBoxWrapper",
} as Meta;

const Template: ComponentStory<typeof ShadowBoxWrapper> = (args) => {
    const refParent = useRef<HTMLUListElement>(null);
    return (
        <div className="bg-neo-bg-A p-3 h-32 flex items-center relative" style={{ width: "300px" }}>
            <ShadowBoxWrapper refParent={refParent} {...args}>
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 1</li>
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 4</li>
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 8</li>
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 10</li>
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 112</li>
            </ShadowBoxWrapper>
        </div>
    );
};

export const Default: ComponentStory<typeof ShadowBoxWrapper> = Template.bind({});
Default.args = {
    classNames: {
        container: "overflow-y-scroll no-scrollbar h-28",
        topShadowBox: "w-full h-10 absolute top-0 z-20",
        bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
    },
    linearGradient: {
        first: "rgba(21,37,53,1)",
        second: "rgba(21, 48, 76,1)",
    },
};
