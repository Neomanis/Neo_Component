import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { Icon, IconTicketCategorie, Tooltip } from "../..";

export default {
    component: Tooltip,
    title: "Atoms/Tooltip",
} as Meta;

const Template: ComponentStory<typeof Tooltip> = (args) => {
    return (
        <div className="p-4 bg-neo-bg-B flex justify-center items-center w-96 h-96">
            <Tooltip {...args} children={<Icon fontIcon={faExclamationCircle} className="text-white p-1" />} />
        </div>
    );
};

export const tooltipIconTop = Template.bind({});
tooltipIconTop.args = {
    text: "test text",
    fontIcon: faExclamationCircle,
    position: "top",
};

export const tooltipComponentBottom = Template.bind({});
tooltipComponentBottom.args = {
    svg: <IconTicketCategorie />,
    text: "test textj cdjsj cjdsjcdj jdcjs gkfrk gfkd kfkdkfkdkfk k kdkfgkj",
    position: "bottom",
};
