/* eslint-disable no-console */
import React, { useRef } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ShadowBoxWrapper from "./ShadowBoxWrapper";

export default {
    component: ShadowBoxWrapper,
    title: "Molecules/ShadowBoxWrapper",
} as Meta;

const Template: ComponentStory<typeof ShadowBoxWrapper> = (args) => {
    const refParent = useRef<HTMLDivElement>(null);
    return (
        <ul className="bg-neo-yellow-sand h-32 flex items-center justify-center relative" style={{ width: "300px" }}>
            <ShadowBoxWrapper refParent={refParent} {...args}>
                <li className="bg-neo-link h-8 flex justify-center items-center p-2 mb-2">Item 1</li>
                <li className="bg-neo-link h-8 flex justify-center items-center p-2 mb-2">Item 4</li>
                <li className="bg-neo-link h-8 flex justify-center items-center p-2 mb-2">Item 8</li>
                <li className="bg-neo-link h-8 flex justify-center items-center p-2 mb-2">Item 10</li>
                <li className="bg-neo-link h-8 flex justify-center items-center p-2 mb-2">Item 112</li>
            </ShadowBoxWrapper>
        </ul>
    );
};

const TemplateDiv: ComponentStory<typeof ShadowBoxWrapper> = (args) => {
    const refParent = useRef<HTMLDivElement>(null);
    return (
        <div className="bg-neo-bg-A flex items-center relative" style={{ width: "500px", height: "250px" }}>
            <ShadowBoxWrapper refParent={refParent} {...args}>
                <div className="m-2 w-48 h-full">
                    <p className="bg-neo-link text-justify p-2">
                        Nunc eleifend placerat lacus, vitae dictum tortor tristique sed. In hac habitasse platea
                        dictumst. Praesent malesuada diam cursus tempus consectetur. Sed in condimentum massa, id porta
                        eros. Nulla convallis urna eu nisl sagittis, ut aliquet augue volutpat. Etiam tempor dictum diam
                        aliquam cursus. Nulla dapibus aliquam elit non laoreet. In interdum ac magna sit amet tempor.
                        Praesent vulputate vitae leo ut aliquam. Sed et tristique dui. Suspendisse cursus massa ex, in
                        volutpat felis semper ut. Sed sollicitudin hendrerit lectus, ac suscipit lectus pellentesque eu.
                        Quisque venenatis, enim eu tincidunt iaculis, eros felis accumsan odio, vitae mollis tellus quam
                        et quam. Aenean in dignissim libero. Mauris tincidunt risus sapien, ac lobortis felis pretium
                        sollicitudin. Mauris ut dictum ipsum, non lacinia sem. Nunc eleifend placerat lacus, vitae
                        dictum tortor tristique sed. In hac habitasse platea dictumst. Praesent malesuada diam cursus
                        tempus consectetur. Sed in condimentum massa, id porta eros. Nulla convallis urna eu nisl
                        sagittis, ut aliquet augue volutpat. Etiam tempor dictum diam aliquam cursus. Nulla dapibus
                        aliquam elit non laoreet. In interdum ac magna sit amet tempor. Praesent vulputate vitae leo ut
                        aliquam. Sed et tristique dui. Suspendisse cursus massa ex, in volutpat felis semper ut. Sed
                        sollicitudin hendrerit lectus, ac suscipit lectus pellentesque eu. Quisque venenatis, enim eu
                        tincidunt iaculis, eros felis accumsan odio, vitae mollis tellus quam et quam. Aenean in
                        dignissim libero. Mauris tincidunt risus sapien, ac lobortis felis pretium sollicitudin. Mauris
                        ut dictum ipsum, non lacinia sem.
                    </p>
                </div>
            </ShadowBoxWrapper>
        </div>
    );
};

export const Default: ComponentStory<typeof ShadowBoxWrapper> = Template.bind({});
Default.args = {
    linearGradient: {
        first: "rgba(125, 170, 183,1)",
        second: "rgba(125, 170, 183, 0.5)",
    },
};

export const OnBlock: ComponentStory<typeof ShadowBoxWrapper> = TemplateDiv.bind({});
OnBlock.args = {
    classNames: {
        topShadowBox: "h-16",
        bottomShadowBox: "h-16",
    },
    linearGradient: "bg-A",
};
