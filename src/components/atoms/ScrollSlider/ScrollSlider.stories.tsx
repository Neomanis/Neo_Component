/* eslint-disable no-console */
import React, { useRef } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ScrollSlider from "./ScrollSlider";

export default {
    component: ScrollSlider,
    title: "Atoms/ScrollSlider",
} as Meta;

const Template: ComponentStory<typeof ScrollSlider> = () => {
    const scrollElementRef = useRef<HTMLDivElement>(null);

    const handleScroll = (value) => {
        const maxScrollLeft = scrollElementRef.current.scrollWidth - scrollElementRef.current.clientWidth;
        scrollElementRef.current.scrollLeft = maxScrollLeft * (value / 100);
    };

    return (
        <div>
            <div className="w-72">
                <ScrollSlider onChange={(value) => handleScroll(value)} />
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

export const Default: ComponentStory<typeof ScrollSlider> = Template.bind({});
