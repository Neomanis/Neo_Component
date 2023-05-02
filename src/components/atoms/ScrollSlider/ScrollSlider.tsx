import { IconChevron } from "@/img/svg";
import React, { ReactElement, useState } from "react";
import ReactSlider from "react-slider";

export interface ScrollSliderProps {
    onChange: (value: number) => void;
}

const ScrollSlider = ({ onChange }: ScrollSliderProps): ReactElement => {
    const [scrollValue, setScrollValue] = useState<number>(0);

    return (
        <div className="flex items-center text-white">
            <div
                className="w-[30px] h-[30px] cursor-pointer bg-neo-bg-A flex items-center justify-center"
                onClick={() => scrollValue !== 0 && (setScrollValue(scrollValue - 1), onChange(scrollValue - 1))}
            >
                <IconChevron width={20} className="fill-neo-link rotate-90" />
            </div>
            <ReactSlider
                className="w-full h-[30px] bg-neo-bg-B"
                thumbClassName="cursor-pointer bg-neo-link w-[10px] h-[30px] focus:outline-0"
                onChange={(value) => {
                    setScrollValue(value);
                    onChange(value);
                }}
                value={scrollValue}
            />
            <div
                className="w-[30px] h-[30px] cursor-pointer bg-neo-bg-A flex items-center justify-center"
                onClick={() => scrollValue !== 100 && (setScrollValue(scrollValue + 1), onChange(scrollValue + 1))}
            >
                <IconChevron width={20} className="fill-neo-link -rotate-90" />
            </div>
        </div>
    );
};

export default ScrollSlider;
