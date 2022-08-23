import React, { CSSProperties, MouseEvent, ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IconProps {
    className?: string;
    fCallBack?: (event: MouseEvent<HTMLDivElement>) => void;
    fontIcon?: IconProp;
    svg?: ReactElement;
    redDot?: boolean;
    style?: CSSProperties;
    type?: string;
    testId?: string;
}

const Icon = ({ className, fCallBack, fontIcon, svg, redDot, style, type, testId }: IconProps): ReactElement => {
    switch (type) {
        case "iconLink":
            return (
                <div className={className} style={style} onClick={fCallBack} data-testid="icon-link-body">
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {!fontIcon && svg && svg}
                </div>
            );
        case "placeholderInput":
            return (
                <div className={className} style={style} data-testid="icon-placeholder-body">
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
                <div className={className} style={style} data-testid="icon-reddot-body">
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {redDot && (
                        <FontAwesomeIcon
                            icon={faCircle}
                            data-testid="icon-reddot"
                            className="text-neo-red absolute top-0 right-0 text-xxs"
                        />
                    )}
                    {!fontIcon && svg && svg}
                </div>
            );
        default:
            return (
                <div
                    className={`${className} flex items-center justify-center`}
                    style={style}
                    onClick={fCallBack}
                    data-testid={testId || "icon-default-body"}
                >
                    {!svg && fontIcon && <FontAwesomeIcon icon={fontIcon} />}
                    {!fontIcon && svg && svg}
                </div>
            );
    }
};

export default Icon;
