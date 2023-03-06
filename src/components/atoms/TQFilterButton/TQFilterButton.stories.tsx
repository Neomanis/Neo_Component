/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TqFilterButton from "./TQFilterButton";
import {
    IconTechnicalQuestionsAll,
    IconTechnicalQuestionsAnswered,
    IconTechnicalQuestionsSolved,
    IconTechnicalQuestionsUnanswered,
} from "@/img/svg";
import Button from "../Button";

export default {
    component: TqFilterButton,
    title: "Atoms/TqFilterButton",
} as Meta;

const Template: ComponentStory<typeof TqFilterButton> = (args) => {
    return <TqFilterButton {...args} />;
};

const TemplateList: ComponentStory<typeof TqFilterButton> = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>();

    return (
        <div className="flex flex-col space-y-5 items-center">
            <div className="flex items-center space-x-10">
                <TqFilterButton
                    name="All questions"
                    svgIcon={<IconTechnicalQuestionsAll className="w-6 h-6" />}
                    isSelected={selectedFilter === "all"}
                    onClick={() => setSelectedFilter("all")}
                />
                <TqFilterButton
                    name="Unanswered"
                    svgIcon={<IconTechnicalQuestionsUnanswered className="w-6 h-6" />}
                    isSelected={selectedFilter === "unanswered"}
                    onClick={() => setSelectedFilter("unanswered")}
                />
                <TqFilterButton
                    name="Answered"
                    svgIcon={<IconTechnicalQuestionsAnswered className="w-6 h-6" />}
                    isSelected={selectedFilter === "answered"}
                    onClick={() => setSelectedFilter("answered")}
                />
                <TqFilterButton
                    name="Solved"
                    svgIcon={<IconTechnicalQuestionsSolved className="w-6 h-6" />}
                    isSelected={selectedFilter === "solved"}
                    onClick={() => setSelectedFilter("solved")}
                />
            </div>
            <Button className="h-10" onClick={() => setSelectedFilter(undefined)}>
                Reset selection
            </Button>
        </div>
    );
};

export const Default: ComponentStory<typeof TqFilterButton> = Template.bind({});
Default.args = {
    name: "All Questions",
    svgIcon: <IconTechnicalQuestionsAll className="w-6 h-6" />,
    isSelected: false,
    onClick: () => console.log("clicked"),
};

export const AllFilters = TemplateList.bind({});
