import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    fCallBack?: () => void;
    fontIcon?: IconProp;
    svg?: ReactElement;
    redDot?: boolean;
    type?: string;
}

const Icon = ({ className, fCallBack, fontIcon, svg, redDot, type }: Props): ReactElement => {
    switch (type) {
        case "iconLink":
            return (
                <div className={className} onClick={fCallBack} data-testid="icon-link-body">
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {!fontIcon && svg && svg}
                </div>
            );
        case "placeholderInput":
            return (
                <div className={`${className}`} data-testid="icon-placeholder-body">
                    {!svg && fontIcon && (
                        <FontAwesomeIcon
                            icon={fontIcon}
                            className="pointer-events-none w-6 h-6 absolute top-12 transform -translate-y-1/2 left-3"
                        />
                    )}
                    {!fontIcon && svg && svg}
                </div>
            );
        case "iconWithRedDot":
            return (
                <div className={className} data-testid="icon-reddot-body">
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {redDot && (
                        <FontAwesomeIcon icon={faCircle} className="text-neo-red absolute top-0 right-0 text-xxs" />
                    )}
                    {!fontIcon && svg && svg}
                </div>
            );
        default:
            return (
                <div
                    className={`${className} flex items-center justify-center`}
                    onClick={fCallBack}
                    data-testid="icon-default-body"
                >
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {!fontIcon && svg && svg}
                </div>
            );
    }
};

export default Icon;
