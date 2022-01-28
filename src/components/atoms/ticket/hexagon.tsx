import React, { ReactElement } from "react";

interface Props {
    bgColor?: string;
    isNotif?: boolean;
    isSelected?: boolean;
    opacity?: string;
    type?: string;
    strokeColor?: string;
}

const Hexagon = ({ bgColor, isNotif, isSelected, opacity, type, strokeColor }: Props): ReactElement => {
    function transformOpacity(): string {
        if (opacity && opacity !== "") {
            return (parseInt(opacity) / 100).toString();
        }
        return "1";
    }

    switch (type) {
        case "ticket":
            return (
                <svg version="1.1" viewBox="-23 -15 220 230" data-testid="hexagonTicket-svg">
                    <path
                        //This line draw the hexagon in the container SVG it includes the shape itself, and the rounding which is applied to the hexagon.
                        d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                        fill={bgColor ? bgColor : "#172f4b"}
                        fillOpacity={transformOpacity()}
                        stroke={"#172f4b"}
                        strokeLinejoin="round"
                        strokeWidth="5"
                    ></path>
                </svg>
            );
        case "filter":
            return (
                <svg version="1.1" viewBox="-23 -15 220 230" data-testid="hexagonFilter-svg">
                    <path
                        d="M69.28 9.998Q86.60 0 103.92 9.998L155.88 40Q173.20 50 173.20 70L173.20 130Q173.20 150 155.88 160L103.92 190Q86.60 200 69.28 190L17.32 160Q0 150 0 130L0 70Q0 50 17.32 40Z"
                        fill={bgColor ? bgColor : "#2fa8fc"}
                        fillOpacity="1"
                        stroke={bgColor ? bgColor : "#2fa8fc"}
                        strokeLinejoin="round"
                        strokeWidth="5"
                        style={isNotif ? { filter: "drop-shadow(#ff0000 0px 0px 10px)" } : undefined}
                    ></path>
                </svg>
            );
        case "rotate":
            return (
                <div className="transform rotate-90" data-testid="hexagonRotate-svg">
                    <svg version="1.1" viewBox="-23 -15 220 230">
                        <path
                            d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                            fill="#7eaab7"
                            fillOpacity="1"
                            stroke="#15304b"
                            strokeLinejoin="round"
                            strokeWidth="5"
                            style={{ filter: "drop-shadow(#ff0000 0px 0px 10px)" }}
                        ></path>
                    </svg>
                </div>
            );
        case "leftHalf":
            return (
                <svg version="1.1" viewBox="-65 -2 150 230" data-testid="hexagonLeftHalf-svg">
                    <path
                        //This line draw the hexagon in the container SVG it includes the shape itself, and the rounding which is applied to the hexagon.
                        d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                        fill={bgColor ? bgColor : "#2fa8fc"}
                        fillOpacity="1"
                        stroke={bgColor ? bgColor : "#2fa8fc"}
                        strokeLinejoin="round"
                        strokeWidth="5"
                    ></path>
                </svg>
            );
        case "rightHalf":
            return (
                <svg version="1.1" viewBox="90 -2 150 230" data-testid="hexagonRightHalf-svg">
                    <path
                        //This line draw the hexagon in the container SVG it includes the shape itself, and the rounding which is applied to the hexagon.
                        d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                        fill={bgColor ? bgColor : "#2fa8fc"}
                        fillOpacity="1"
                        stroke={bgColor ? bgColor : "#2fa8fc"}
                        strokeLinejoin="round"
                        strokeWidth="10"
                    ></path>
                </svg>
            );
        default:
            return (
                <svg version="1.1" viewBox="-23 -15 220 230" data-testid="hexagonDefault-svg">
                    <path
                        d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                        fill={bgColor ? bgColor : ""}
                        fillOpacity={bgColor ? "1" : "0"}
                        strokeLinejoin="round"
                        stroke={strokeColor ? (isSelected ? strokeColor : "#172f4b") : "#172f4b"}
                        strokeWidth="5"
                    ></path>
                </svg>
            );
    }
};

export default Hexagon;
