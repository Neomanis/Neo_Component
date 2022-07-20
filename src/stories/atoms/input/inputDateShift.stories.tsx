import React, { useMemo } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputDateShift } from "../../../components/atoms";
import { useForm } from "react-hook-form";

export default {
    component: InputDateShift,
    title: "Atoms/input/InputDateShift",
} as Meta;

const Template: ComponentStory<typeof InputDateShift> = () => {
    const date = useMemo(() => new Date(), []);
    const shifts = [
        { value: 3600, label: "1h" },
        { value: 3600 * 6, label: "6h" },
        { value: 3600 * 24, label: "1j" },
        { value: 3600 * 48, label: "2j" },
        { value: 3600 * 72, label: "3j" },
    ];
    const formMethods = useForm();

    return (
        <div className="w-full bg-neo-bg-A p-3">
            <InputDateShift
                formMethods={formMethods}
                refForm="dateShift"
                date={date}
                label="Exemple Label"
                lang="fr-FR"
                inputSelectPlaceholder="shift"
                tabProps={shifts}
            />
        </div>
    );
};

export const Default: ComponentStory<typeof InputDateShift> = Template.bind({});
