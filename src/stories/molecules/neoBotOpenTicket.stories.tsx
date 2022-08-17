import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import NeoBotOpenTicket from "../../components/molecules/neoBotOpenTicket";
import { QueueIconEmpty } from "../../img/png";

export default {
    component: NeoBotOpenTicket,
    title: "Molecules/NeobotOpenTicket",
} as Meta;

const Template: ComponentStory<typeof NeoBotOpenTicket> = (args) => {
    return (
        <div className="flex items-center flex-col w-72" style={{ height: "470px" }}>
            <NeoBotOpenTicket {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    className: "",
    message: "Creating a new ticket",
    showEllipsis: true,
    img: QueueIconEmpty,
};
