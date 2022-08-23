import React, { ReactElement, useRef } from "react";
import InlineShadowBoxWrapper from "./InlineShadowBoxWrapper";

interface Props {
    width: string;
}

const TestWrapper = ({ width }: Props): ReactElement => {
    const refP = useRef<HTMLUListElement>(null);
    return (
        <div className="h-32 flex items-center relative w-min">
            <InlineShadowBoxWrapper
                refP={refP}
                classNames={{
                    container: "flex overflow-x-scroll no-scrollbar " + width,
                    leftShadowBox: "w-10 h-10 absolute left-0 z-20",
                    rightShadowBox: "w-10 h-10 absolute right-0 z-20",
                }}
                linearGradient={{
                    first: "rgba(21,37,53,1)",
                    second: "rgba(21, 48, 76,1)",
                }}
            >
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item1</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item4</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item8</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item10</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item112</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item124</li>
                <li className="bg-neo-bg-B text-white justify-center items-center p-2">Item148</li>
            </InlineShadowBoxWrapper>
        </div>
    );
};

export default TestWrapper;
