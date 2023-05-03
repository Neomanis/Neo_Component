import { IconChevron } from "@/img/svg";
import { classNames } from "@/utils";
import React, { ReactElement, useState } from "react";
import ReactSlider from "react-slider";

export interface ScrollSliderProps {
    onChange: (value: number) => void;
    disabled?: boolean;
    arrowsValue?: number;
}

const ScrollSlider = ({ onChange, disabled, arrowsValue = 1 }: ScrollSliderProps): ReactElement => {
    const [scrollValue, setScrollValue] = useState<number>(0);

    return (
        <div
            data-testid="slider-body"
            className={classNames(disabled ? "cursor-not-allowed opacity-20" : "cursor-pointer", "flex items-center")}
        >
            <div
                data-testid="slider-minus"
                className="w-[30px] h-[30px] bg-neo-bg-A flex items-center justify-center"
                onClick={() =>
                    scrollValue !== 0 &&
                    !disabled &&
                    (setScrollValue(scrollValue - arrowsValue), onChange(scrollValue - arrowsValue))
                }
            >
                <IconChevron width={20} className="fill-neo-link rotate-90" />
            </div>
            <ReactSlider
                className="w-full h-[30px] bg-neo-bg-B"
                thumbClassName={classNames(disabled && "hidden", "bg-neo-link w-[10px] h-[30px] focus:outline-0")}
                onChange={(value) => {
                    setScrollValue(value);
                    onChange(value);
                }}
                value={scrollValue}
                disabled={disabled}
            />
            <div
                data-testid="slider-plus"
                className="w-[30px] h-[30px] bg-neo-bg-A flex items-center justify-center"
                onClick={() =>
                    scrollValue !== 100 &&
                    !disabled &&
                    (setScrollValue(scrollValue + arrowsValue), onChange(scrollValue + arrowsValue))
                }
            >
                <IconChevron width={20} className="fill-neo-link -rotate-90" />
            </div>
        </div>
    );
};

export default ScrollSlider;
