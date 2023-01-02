/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ShadowBoxWrapper from "./ShadowBoxWrapper";

export default {
    component: ShadowBoxWrapper,
    title: "Molecules/ShadowBoxWrapper",
} as Meta;

function creatDiv(number: number) {
    const item = [];
    for (let i = 0; i < number; i++) {
        item.push(i);
    }
    return (
        <>
            {item.map((index) => (
                <li className="bg-neo-link rounded-none h-8 flex justify-center items-center p-2 m-2 min-w-[80px]">
                    Item {index}
                </li>
            ))}
        </>
    );
}

const Template: ComponentStory<typeof ShadowBoxWrapper> = (args) => {
    return (
        <div className="bg-neo-bg-B p-8 rounded w-full h-[50vh]">
            <ShadowBoxWrapper {...args}>{creatDiv(50)}</ShadowBoxWrapper>
        </div>
    );
};

export const Default: ComponentStory<typeof ShadowBoxWrapper> = Template.bind({});
Default.args = {
    linearGradient: "bg-B",
};
export const DefaultInline: ComponentStory<typeof ShadowBoxWrapper> = Template.bind({});
DefaultInline.args = {
    linearGradient: "bg-B",
    inline: true,
    listClassName: "space-x-2",
};
