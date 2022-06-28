/* eslint-disable no-console */
import React from "react";
import OutageItem from "../../../components/molecules/notification/outageItem";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/Outage/OutageItem",
    component: OutageItem,
} as Meta;

const Template: ComponentStory<typeof OutageItem> = (args) => {
    return (
        <div className="w-full h-full bg-neo-bg-A flex">
            <div className="pr-5 relative flex" style={{ minWidth: 360, maxWidth: 360 }}>
                <OutageItem {...args} />
            </div>
            <div className="pr-5 relative flex" style={{ minWidth: 360, maxWidth: 360 }}>
                <OutageItem {...args} />
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: {
        entities: [
            {
                id: 1,
                name: "entity 1",
            },
        ],
        id: 1,
        title: "Outage 1",
        content: "Printer out",
        severity: "major",
        type: "",
        startAt: new Date().toDateString(),
        endAt: new Date("2034/06/05").toDateString(),
        displayAt: new Date().toDateString(),
        hideAt: new Date("2034/06/05").toDateString(),
    },
    isNotSelected: false,
    hoverInCallBack: () => console.log("coucou"),
    hoverOutCallBack: () => console.log("coucou"),
};
