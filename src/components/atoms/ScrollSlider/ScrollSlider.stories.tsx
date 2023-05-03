/* eslint-disable no-console */
import React, { useRef } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ScrollSlider from "./ScrollSlider";

export default {
    component: ScrollSlider,
    title: "Atoms/ScrollSlider",
} as Meta;

const Template: ComponentStory<typeof ScrollSlider> = (args) => {
    const scrollElementRef = useRef<HTMLDivElement>(null);

    const handleScroll = (value) => {
        const maxScrollLeft = scrollElementRef.current.scrollWidth - scrollElementRef.current.clientWidth;
        scrollElementRef.current.scrollLeft = maxScrollLeft * (value / 100);
    };

    return (
        <div>
            <div className="w-72">
                <ScrollSlider onChange={(value) => handleScroll(value)} {...args} />
            </div>
            <div ref={scrollElementRef} className="w-[600px] overflow-auto mt-5 no-scrollbar">
                <p className="text-white whitespace-nowrap">
                    Try to move the slider above me ! Im a very long text that need to be scrolled, but you can't do it
                    with a simple scrollbar. Fortunately, there is a magical slider !
                </p>
            </div>
        </div>
    );
};

const Template2: ComponentStory<typeof ScrollSlider> = (args) => {
    return (
        <div className="w-72">
            <ScrollSlider {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof ScrollSlider> = Template.bind({});

export const Disabled: ComponentStory<typeof ScrollSlider> = Template2.bind({});
Disabled.args = {
    onChange: (value) => console.log(value),
    disabled: true,
};

export const WithBigSteps: ComponentStory<typeof ScrollSlider> = Template.bind({});
WithBigSteps.args = {
    arrowsValue: 20,
};
