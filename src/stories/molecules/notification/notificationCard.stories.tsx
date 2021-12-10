/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { NotificationCard } from "../../../components/molecules";

export default {
    component: NotificationCard,
    title: "Molecules/Notification/NotificationCard",
} as Meta;

const Template: ComponentStory<typeof NotificationCard> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 flex items-center" style={{ width: 400 }}>
            <NotificationCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content:
        "Where is Ryan ? lfgf dg sogfdos ogfdso gofdso gofdsog fids i igfdos gifdso i  igfdks kiiiiiiiiiiiiidfus dfu sfduisfd fdsfudsifdu fids ufdsf iusdf iusdf udsf udsfsdifu sdif usdfiudsfusdf usdf usdfu gfdk skgfdksgk gfkdsk gkfdk igfdos igfods   ",
    date: "2021-09-05 10:58:24",
    fDeleteNotification: () => console.log(" fDeleteNotification"),
    fInitialRender: () => console.log("fInitialRender"),
    fReadNotification: () => console.log("fReadNotification"),
    notificationId: 1,
    read: false,
    userUid: "21",
};
