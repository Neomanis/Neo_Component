/* eslint-disable no-console */
import React from "react";
import DndTest from "../../components/molecules/dndTest";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeGlpiGroups, fakeGlpiUsers, fakeTicket } from "../fakeObject";

export default {
    title: "Molecules/DndTest",
    component: DndTest,
} as Meta;

const Template: ComponentStory<typeof DndTest> = (args) => {
    return (
        <div className="">
            <DndTest {...args} />
        </div>
    );
};

export const ToasterDefault = Template.bind({});
ToasterDefault.args = {
    gridProps1: {
        rows: 4,
        cols: 1,
        glpiGroups: fakeGlpiGroups,
        glpiUsers: fakeGlpiUsers,
        fCurrentTicket: () => console.log("fCurrentTicket"),
        fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
        fOpenTicketModal: () => console.log("fOpenTicketModal"),
        fShowChatModal: () => console.log("fShowChatModal"),
        ticketList: Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) })),
        showPagination: true,
        reverseGrid: false,
        withHover: true,
    },
    gridProps2: {
        rows: 4,
        cols: 4,
        glpiGroups: fakeGlpiGroups,
        glpiUsers: fakeGlpiUsers,
        fCurrentTicket: () => console.log("fCurrentTicket"),
        fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
        fOpenTicketModal: () => console.log("fOpenTicketModal"),
        fShowChatModal: () => console.log("fShowChatModal"),
        ticketList: Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 200) })),
        showPagination: true,
        reverseGrid: false,
        withHover: true,
        isDroppable: true,
    },
};
