import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    fCallBack?: () => void;
    fontIcon: IconProp;
    redDot?: boolean;
    type?: string;
}

const Icon = ({ className, fCallBack, fontIcon, redDot, type }: Props): ReactElement => {
    switch (type) {
        case "iconLink":
            return (
                <div
                    className={`${className} p-4 text-neo_bg_B hover:text-neo_bg_B-blue_sky cursor-pointer text-4xl`}
                    onClick={fCallBack}
                >
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            );
        case "placeholderInput":
            return (
                <div className="p-4 text-neo_bg_B text-4xl">
                    <FontAwesomeIcon
                        icon={fontIcon}
                        className="pointer-events-none w-6 h-6 absolute top-12 transform -translate-y-1/2 left-3"
                    />
                </div>
            );
        case "iconWithRedDot":
            return (
                <div className={`${className} p-1 text-neo_bg_B text-4xl relative w-10`}>
                    <FontAwesomeIcon icon={fontIcon} />
                    {redDot && (
                        <FontAwesomeIcon icon={faCircle} className="text-neo_red absolute top-0 right-0 text-xxs" />
                    )}
                </div>
            );
        default:
            return (
                <div className={`${className} flex items-center justify-center`} onClick={fCallBack}>
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            );
    }
};

export default Icon;
