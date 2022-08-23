import React, { ReactElement } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";

export interface WritingDotsProps {
    animation?: string;
    className?: string;
    delay?: number;
    dotClassName?: string;
}

const WritingDots = ({
    animation = "animate-pulseDots",
    className,
    delay = 300,
    dotClassName,
}: WritingDotsProps): ReactElement => {
    return (
        <div className={` ${className} flex py-1 px-2 text-white text-3xs`} data-testid="writingDots-body">
            <Icon className={`${dotClassName} ${animation}`} fontIcon={faCircle} />
            <Icon
                className={`${dotClassName} ${animation} px-1`}
                fontIcon={faCircle}
                style={{ animationDelay: delay.toString() + "ms" }}
            />
            <Icon
                className={`${dotClassName} ${animation}`}
                fontIcon={faCircle}
                style={{ animationDelay: (delay * 2).toString() + "ms" }}
            />
        </div>
    );
};

export default WritingDots;
