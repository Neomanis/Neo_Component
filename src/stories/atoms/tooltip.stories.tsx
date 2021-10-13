import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { ComponentStory, Meta } from "@storybook/react";
import { IconTicketCategorie, Tooltip } from "../..";

export default {
    title: "Atoms/Tooltip",
    component: Tooltip,
} as Meta;

const Template: ComponentStory<typeof Tooltip> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4">
            <Tooltip {...args} />
        </div>
    );
};

export const tooltipIconDefault = Template.bind({});
tooltipIconDefault.args = {
    data: "data test",
    fontIcon: faExclamationCircle,
    className: "",
};

export const tooltipIconTop = Template.bind({});
tooltipIconTop.args = {
    position: "top",
    data: "data test",
    fontIcon: faExclamationCircle,
    className: "",
};

export const tooltipComponentDefault = Template.bind({});
tooltipComponentDefault.args = {
    data: "data test",
    component: <IconTicketCategorie />,
    className: "",
};

export const tooltipComponentTop = Template.bind({});
tooltipComponentTop.args = {
    position: "top",
    data: "data test",
    component: <IconTicketCategorie />,
    className: "",
};
