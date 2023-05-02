/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ButtonFilter from "./ButtonFilter";

export default {
    component: ButtonFilter,
    title: "Atoms/ButtonFilter",
} as Meta;

const Template: ComponentStory<typeof ButtonFilter> = () => {
    const [filters, setFilters] = useState({ base: true, custom: true });

    return (
        <div className="flex gap-4">
            <ButtonFilter
                id="base-filter"
                title="Base filter"
                isActive={filters.base}
                onClick={() => setFilters((old) => ({ ...old, base: !old.base }))}
            />
            <ButtonFilter
                id="custom-filter"
                title="Custom filter"
                isActive={filters.custom}
                onClick={() => setFilters((old) => ({ ...old, custom: !old.custom }))}
            />
        </div>
    );
};

export const Default: ComponentStory<typeof ButtonFilter> = Template.bind({});
