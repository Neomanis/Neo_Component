import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import Loader from "../../components/atoms/loader";

export default {
    title: "Atoms/Loader",
    component: Loader,
} as Meta;

const Template: ComponentStory<typeof Loader> = (args) => {
    return (
        <div className=" bg-neo_expanded_view p-2 flex items-center ">
            <Loader {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: "Exemple",
};

export const CircleOnly = Template.bind({});
CircleOnly.args = {
    type: "circleOnly",
};
