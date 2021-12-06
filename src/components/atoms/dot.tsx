import React, { ReactElement, useRef, useEffect } from "react";
import { faCheck, faExclamationTriangle, faUndo } from "@fortawesome/free-solid-svg-icons";

import Icon from "./icon";
import Tooltip from "./tooltip";

interface Props {
    errorMessage?: string;
    isCancelable?: boolean;
    isCooldown: boolean;
    isError?: boolean | undefined;
    isSuccess: boolean;
    isUpdateField: boolean;
    onClickCallback: () => void;
    positionClassname?: string;
    timer?: number;
    trigger?: boolean;
}

const Dot = ({
    errorMessage,
    isCancelable,
    isCooldown,
    isError,
    isSuccess,
    isUpdateField,
    onClickCallback,
    positionClassname,
    timer = 5000,
    trigger,
}: Props): ReactElement => {
    const radius = 45;
    const animationRef = useRef<SVGAnimateElement>(null);

    function getCircleCircumference(radius: number) {
        return 2 * Math.PI * radius;
    }

    useEffect(() => {
        animationRef.current?.beginElement();
    }, [trigger]);

    return (
        <div
            className={`${positionClassname} relative w-5 p-1 text-center rounded-full text-white ${
                (isCancelable || isError) && "bg-neo-red cursor-pointer"
            } ${isSuccess && "bg-neo-green"}`}
            onClick={(): void => {
                isCancelable && onClickCallback();
            }}
            data-testid="dot-body"
        >
            {isCooldown && (
                <svg
                    className="w-6 h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    id="circle"
                    version="1.1"
                    viewBox="0 0 100 100"
                    x="0px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    y="0px"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        r={radius}
                        stroke="#7FEF7F"
                        strokeDasharray={getCircleCircumference(radius)}
                        strokeLinecap="round"
                        strokeMiterlimit="0"
                        strokeWidth="10"
                        transform="rotate(-90 ) translate(-100 0)"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            dur={`${timer / 1000}s`}
                            ref={animationRef}
                            values={`${getCircleCircumference(radius)};0`}
                        ></animate>
                    </circle>
                </svg>
            )}
            {isCancelable && (
                <div className={`text-xs relative `}>
                    {!isError && <Icon fontIcon={faUndo} />}
                    {isError && errorMessage && (
                        <Tooltip
                            className="bg-neo-red text-white px-4 py-1 rounded"
                            data={errorMessage}
                            fontIcon={faExclamationTriangle}
                            fontIconClassName="text-white"
                        />
                    )}
                </div>
            )}
            {!isUpdateField && isError && errorMessage && (
                <div className="text-xs">
                    <Tooltip
                        className="bg-neo-red text-white px-4 py-1 rounded"
                        data={errorMessage}
                        fontIcon={faExclamationTriangle}
                        fontIconClassName="text-white"
                    />
                </div>
            )}
            {isSuccess && (
                <div className="text-xs">
                    <Icon fontIcon={faCheck} />
                </div>
            )}
        </div>
    );
};
export default Dot;
