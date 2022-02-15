import { faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement } from "react";
import { Icon } from "..";

interface Props {
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
}: Props): ReactElement => {
    return (
        <div className={` ${className} flex py-1 px-2 text-white text-3xs`} data-testid="writingDots-body">
            <Icon className={`${dotClassName} ${animation}`} fontIcon={faCircle} />
            <Icon className={`${dotClassName} ${animation} px-1 animation-delay-${delay}`} fontIcon={faCircle} />
            <Icon className={`${dotClassName} ${animation} animation-delay-${delay * 2}`} fontIcon={faCircle} />
        </div>
    );
};

export default WritingDots;
