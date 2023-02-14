/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import UneditableField from "./UneditableField";
import { IconAdd } from "@/img/svg";

export default {
    component: UneditableField,
    title: "Atoms/UneditableField",
} as Meta;

const Template: ComponentStory<typeof UneditableField> = (args) => {
    return (
        <div style={{ width: 300 }}>
            <UneditableField {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof UneditableField> = Template.bind({});
Default.args = {
    variant: "primary",
    label: "UneditableField",
    children: "toujours pas d'inspi",
};

export const BackgroundColor: ComponentStory<typeof UneditableField> = Template.bind({});
BackgroundColor.args = {
    variant: "secondary",
    label: "UneditableField",
    mainColor: { bg: "bg-neo-pink" },
    children: "ploup mamen",
};

export const FullCustom: ComponentStory<typeof UneditableField> = Template.bind({});
FullCustom.args = {
    variant: "custom",
    label: "UneditableField",
    children: (
        <div className="flex flex-row items-center fill-neo-green">
            <p className="text-neo-pink mr-3">HORRIBLE RAINBOW</p>
            <IconAdd width={40} />
        </div>
    ),
    className: "border-2 border-neo-orange p-3 flex flex-row-reverse justify-end fill-neo-green",
    labelClassName: "text-neo-yellow-sand text-2xl",
};
