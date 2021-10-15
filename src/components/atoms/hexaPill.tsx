import React, { ReactElement } from "react";

interface Props {
    color: string;
    ticketNumber: number;
}

const HexaPill = ({ color, ticketNumber }: Props): ReactElement => {
    return (
        <div className="h-12">
            <svg version="1.1" width="45" height="45" viewBox="-23 -15 220 230">
                <path
                    d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                    fillOpacity="0"
                    stroke={color}
                    strokeLinejoin="round"
                    strokeWidth="6"
                ></path>
                <text x="40%" y="48%" fontSize="60" dominantBaseline="middle" textAnchor="middle" fill={color}>
                    {ticketNumber}
                </text>
            </svg>
        </div>
    );
};

export default HexaPill;
