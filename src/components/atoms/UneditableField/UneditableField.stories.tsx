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
    data: "bien le bonjour",
};

export const Empty: ComponentStory<typeof UneditableField> = Template.bind({});
Empty.args = {
    variant: "primary",
    label: "UneditableField",
};

export const BackgroundColor: ComponentStory<typeof UneditableField> = Template.bind({});
BackgroundColor.args = {
    variant: "secondary",
    label: "UneditableField",
    mainColor: { bg: "bg-neo-pink" },
    data: "ploup mamen",
};

export const FullCustom: ComponentStory<typeof UneditableField> = Template.bind({});
FullCustom.args = {
    variant: "custom",
    label: "UneditableField",
    data: "HORRIBLE RAINBOW",
    component: <IconAdd width={40} />,
    className: "border-2 border-neo-orange p-3 flex flex-row-reverse justify-end fill-neo-green",
    labelClassName: "text-neo-yellow-sand text-2xl",
};
