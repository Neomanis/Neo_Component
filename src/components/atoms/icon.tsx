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
                    className={`${className} p-4 text-neo-bg-B hover:text-neo-blue cursor-pointer text-4xl`}
                    onClick={fCallBack}
                    data-testid="icon-link-body"
                >
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            );
        case "placeholderInput":
            return (
                <div className="p-4 text-neo-bg-B text-4xl" data-testid="icon-placeholder-body">
                    <FontAwesomeIcon
                        icon={fontIcon}
                        className="pointer-events-none w-6 h-6 absolute top-12 transform -translate-y-1/2 left-3"
                    />
                </div>
            );
        case "iconWithRedDot":
            return (
                <div className={`${className} p-1 text-neo-bg-B text-4xl relative w-10`} data-testid="icon-reddot-body">
                    <FontAwesomeIcon icon={fontIcon} />
                    {redDot && (
                        <FontAwesomeIcon icon={faCircle} className="text-neo-red absolute top-0 right-0 text-xxs" />
                    )}
                </div>
            );
        default:
            return (
                <div
                    className={`${className} flex items-center justify-center`}
                    onClick={fCallBack}
                    data-testid="icon-default-body"
                >
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            );
    }
};

export default Icon;
