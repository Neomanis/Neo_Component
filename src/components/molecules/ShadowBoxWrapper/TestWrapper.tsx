import React, { ReactElement, useRef } from "react";
import ShadowBoxWrapper from "./ShadowBoxWrapper";

interface Props {
    multipleChild: boolean;
}

const TestWrapper = ({ multipleChild }: Props): ReactElement => {
    const refParent = useRef<HTMLUListElement>(null);
    return (
        <div className="h-32 flex items-center relative w-min">
            <ShadowBoxWrapper
                refParent={refParent}
                classNames={{
                    container: "overflow-y-scroll no-scrollbar h-28",
                    topShadowBox: "w-full h-10 absolute top-0 z-20",
                    bottomShadowBox: "w-full h-10 absolute bottom-0 z-20",
                }}
                linearGradient={{
                    first: "rgba(21,37,53,1)",
                    second: "rgba(21, 48, 76,1)",
                }}
            >
                <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 1</li>
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 4</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 8</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 10</li>}
                {multipleChild && <li className="bg-neo-bg-B h-8 flex justify-center items-center p-2">Item 112</li>}
            </ShadowBoxWrapper>
        </div>
    );
};

export default TestWrapper;
