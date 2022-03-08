/* eslint-disable no-console */
import React from "react";
import DndTest from "../../components/molecules/dndTest";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/DndTest",
    component: DndTest,
} as Meta;

const Template: ComponentStory<typeof DndTest> = (args) => {
    return (
        <div>
            <DndTest {...args} />
        </div>
    );
};

export const ToasterDefault = Template.bind({});
ToasterDefault.args = {
    title: "Hello there",
};
