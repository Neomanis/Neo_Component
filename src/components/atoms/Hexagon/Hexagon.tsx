import React, { ReactElement, useMemo } from "react";
import NeoColors from "@/utils/neoColors";

export interface HexagonProps {
    bgColor?: string;
    isSelected?: boolean;
    opacity?: string;
    type?: string;
    strokeColor?: string;
}

const Hexagon = ({ bgColor, isSelected, opacity, type, strokeColor }: HexagonProps): ReactElement => {
    const transformOpacity = useMemo(() => {
        if (opacity && opacity !== "") {
            return (parseInt(opacity) / 100).toString();
        }
        return "1";
    }, [opacity]);

    const svg = useMemo(() => {
        switch (type) {
            case "ticket":
                return (
                    <svg version="1.1" viewBox="-3 -3 180 205" data-testid="hexagonTicket-svg">
                        <path
                            //This line draw the hexagon in the container SVG it includes the shape itself, and the rounding which is applied to the hexagon.
                            d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                            fill={bgColor ? bgColor : "transparent"}
                            fillOpacity={transformOpacity}
                            stroke={NeoColors.bg.B}
                            strokeLinejoin="round"
                            strokeWidth="5"
                        ></path>
                    </svg>
                );
            default:
                return (
                    <svg version="1.1" viewBox="-3 -3 180 205" data-testid="hexagonDefault-svg">
                        <path
                            d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                            fill={bgColor ? bgColor : "transparent"}
                            fillOpacity={bgColor ? "1" : "0"}
                            strokeLinejoin="round"
                            stroke={strokeColor && isSelected ? strokeColor : NeoColors.bg.B}
                            strokeWidth="5"
                        ></path>
                    </svg>
                );
        }
    }, [type, bgColor, isSelected, strokeColor]);

    return <>{svg}</>;
};

export default Hexagon;
