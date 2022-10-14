/* eslint-disable no-console */
import React, { useRef } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InlineShadowBoxWrapper from "./InlineShadowBoxWrapper";

export default {
    component: InlineShadowBoxWrapper,
    title: "Molecules/InlineShadowBoxWrapper",
} as Meta;

const Template: ComponentStory<typeof InlineShadowBoxWrapper> = (args) => {
    const refP = useRef<HTMLUListElement>(null);

    return (
        <div className="h-32 flex items-center relative w-min">
            <InlineShadowBoxWrapper refP={refP} {...args}>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item1</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item4</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item8</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item10</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item112</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item124</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item148</li>
            </InlineShadowBoxWrapper>
        </div>
    );
};

export const Default: ComponentStory<typeof InlineShadowBoxWrapper> = Template.bind({});
Default.args = {
    classNames: {
        container: "flex overflow-x-scroll no-scrollbar w-60",
        leftShadowBox: "w-10 h-10 absolute left-0 z-20",
        rightShadowBox: "w-10 h-10 absolute right-0 z-20",
    },
    linearGradient: {
        first: "rgba(21,37,53,1)",
        second: "rgba(21, 48, 76,1)",
    },
};