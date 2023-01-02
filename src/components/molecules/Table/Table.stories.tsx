/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Table from "./Table";
import { columns, data } from "./TableDataExemple";

export default {
    component: Table,
    title: "Table",
} as Meta;

const Template: ComponentStory<typeof Table> = () => {
    return <Table columns={columns} data={data} />;
};

export const Default: ComponentStory<typeof Table> = Template.bind({});
