import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    fCallBack?: () => void;
    fontIcon: IconProp;
    type?: string;
}

const Icon = ({ className, fCallBack, fontIcon, type }: Props): ReactElement => {
    switch (type) {
        case "iconLink":
            return (
                <div
                    className={`${className} p-4 text-neo_black-black_02 hover:text-neo_blue-blue_sky cursor-pointer text-4xl`}
                    onClick={fCallBack}
                >
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            );
        case "placeholderInput":
            return (
                <div className="p-4 text-neo_black-black_0 text-4xl">
                    <FontAwesomeIcon
                        className="pointer-events-none w-6 h-6 absolute top-12 opacity-50 transform -translate-y-1/2 left-3"
                        icon={fontIcon}
                    />
                </div>
            );
        case "iconWithRedDot":
            return (
                <div className={`${className} p-1 text-neo_black-black_02 text-4xl relative w-10`}>
                    <FontAwesomeIcon icon={fontIcon} />
                    {fCallBack && (
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
