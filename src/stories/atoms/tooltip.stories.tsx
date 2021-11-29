import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { IconTicketCategorie, Tooltip } from "../..";

export default {
    component: Tooltip,
    title: "Atoms/Tooltip",
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
    className: "",
    data: "data test",
    fontIcon: faExclamationCircle,
};

export const tooltipIconTop = Template.bind({});
tooltipIconTop.args = {
    className: "",
    data: "data test",
    fontIcon: faExclamationCircle,
    position: "top",
};

export const tooltipComponentDefault = Template.bind({});
tooltipComponentDefault.args = {
    className: "",
    component: <p>test</p>,
    data: "data test",
};

export const tooltipComponentTop = Template.bind({});
tooltipComponentTop.args = {
    className: "",
    component: <IconTicketCategorie />,
    data: "data test",
    position: "top",
};
