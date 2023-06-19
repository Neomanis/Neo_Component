/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import UserTile from "./UserTile";
import { fakeUser } from "@/utils/storiesData/fakeObject";
import { NeomanisUser } from "@neomanis/neo-types";

export default {
    component: UserTile,
    title: "Atoms/UserTile",
} as Meta;

const Template: ComponentStory<typeof UserTile> = (args) => {
    return <UserTile tileWidth={128} {...args} />;
};

export const Default: ComponentStory<typeof UserTile> = Template.bind({});
Default.args = {
    type: "user",
    user: fakeUser,
    selectedId: 0,
};

export const EmptyUser: ComponentStory<typeof UserTile> = Template.bind({});
EmptyUser.args = {
    type: "user",
    user: {} as NeomanisUser,
    selectedId: 0,
};

export const GroupTile: ComponentStory<typeof UserTile> = Template.bind({});
GroupTile.args = {
    type: "group",
    group: {
        id: 0,
        itsmCode: "gl1",
        name: "Nakama yolo hopp",
    },
    selectedId: 0,
};

export const NoUserOrGroup: ComponentStory<typeof UserTile> = Template.bind({});
NoUserOrGroup.args = {
    type: "user",
    selectedId: 0,
};

export const WithSizeAndNoText: ComponentStory<typeof UserTile> = Template.bind({});
WithSizeAndNoText.args = {
    type: "group",
    group: {
        id: 0,
        itsmCode: "gl1",
        name: "Nakama squad",
    },
    selectedId: 1,
    tileClassName: "h-16 w-16 text-3xl",
    showName: false,
};

export const ReadOnly: ComponentStory<typeof UserTile> = Template.bind({});
ReadOnly.args = {
    type: "group",
    group: {
        id: 0,
        itsmCode: "gl1",
        name: "Nakama squad",
    },
    selectedId: 1,
    readOnly: true,
};
