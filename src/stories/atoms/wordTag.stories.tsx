import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { WordTag } from "../..";

export default {
    component: WordTag,
    title: "Atoms/WordTag",
} as Meta;

const Template: ComponentStory<typeof WordTag> = () => {
    const wordArray = [
        {
            keyword: "printer",
            dependenciesNumber: 4,
        },
        {
            keyword: "network",
        },
        {
            keyword: "internet",
            dependenciesNumber: 43,
        },
        {
            keyword: "pouette",
            dependenciesNumber: 434,
        },
    ];
    return (
        <div className="p-4 flex items-center w-full ">
            {wordArray.map((el) => {
                return <WordTag keyword={el.keyword} dependenciesNumber={el.dependenciesNumber} />;
            })}
        </div>
    );
};

export const Default = Template.bind({});
