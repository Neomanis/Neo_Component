import { faCheck, faExclamationTriangle, faUndo } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, useRef, useEffect } from "react";
import Icon from "./icon";
import Tooltip from "./tooltip";

interface Props {
    errorMessage?: string;
    isCancelable?: boolean;
    isCooldown: boolean;
    isError?: boolean | undefined;
    isSuccess: boolean;
    isUpdateField: boolean;
    positionClassname?: string;
    timer?: number;
    trigger?: boolean;
    onClickCallback: () => void;
}

const Dot = ({
    errorMessage,
    isCancelable,
    isCooldown,
    isError,
    isSuccess,
    isUpdateField,
    positionClassname,
    timer = 5000,
    trigger,
    onClickCallback,
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
                (isCancelable || isError) && "bg-neo_red cursor-pointer"
            } ${isSuccess && "bg-neo_urgency-very_low"}`}
            onClick={(): void => {
                isCancelable && onClickCallback();
            }}
        >
            {isCooldown && (
                <svg
                    className="w-6 h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    version="1.1"
                    id="circle"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    xmlSpace="preserve"
                >
                    <circle
                        fill="none"
                        stroke="#7FEF7F"
                        strokeWidth="10"
                        strokeMiterlimit="0"
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeDasharray={getCircleCircumference(radius)}
                        strokeLinecap="round"
                        transform="rotate(-90 ) translate(-100 0)"
                    >
                        <animate
                            ref={animationRef}
                            attributeName="stroke-dashoffset"
                            values={`${getCircleCircumference(radius)};0`}
                            dur={`${timer / 1000}s`}
                        ></animate>
                    </circle>
                </svg>
            )}
            {isCancelable && (
                <div className={`text-xs relative `}>
                    {!isError && <Icon fontIcon={faUndo} />}
                    {isError && errorMessage && (
                        <Tooltip
                            fontIcon={faExclamationTriangle}
                            data={errorMessage}
                            fontIconClassName="text-white"
                            className="bg-neo_red"
                        />
                    )}
                </div>
            )}
            {!isUpdateField && isError && errorMessage && (
                <div className="text-xs">
                    <Tooltip
                        fontIcon={faExclamationTriangle}
                        data={errorMessage}
                        fontIconClassName="text-white"
                        className="bg-neo_red"
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
