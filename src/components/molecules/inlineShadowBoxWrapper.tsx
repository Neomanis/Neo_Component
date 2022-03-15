import React, { ReactElement, ReactNode, useLayoutEffect, useRef, useState } from "react";

interface Props {
    children: ReactNode;
    classNames: {
        leftShadowBox: string;
        rightShadowBox: string;
        container: string;
    };
    linearGradient: {
        first: string;
        second: string;
    };
}

const InlineShadowBoxWrapper = ({ children, classNames, linearGradient }: Props): ReactElement => {
    const [showLeftShadowBox, setShowLeftShadowBox] = useState(false);
    const [showRightShadowBox, setShowRightShadowBox] = useState(true);

    const listContainerRef = useRef<HTMLUListElement>(null);

    function detectScroll(ref: HTMLUListElement): void {
        const scrollPercentage = ref.scrollLeft / (ref.scrollWidth - ref.clientWidth);
        if (scrollPercentage === 0) {
            setShowLeftShadowBox(false);
            setShowRightShadowBox(true);
        }
        if (scrollPercentage === 1) {
            setShowLeftShadowBox(true);
            setShowRightShadowBox(false);
        }
        if (scrollPercentage > 0 && scrollPercentage < 1) {
            setShowLeftShadowBox(true);
            setShowRightShadowBox(true);
        }
    }

    function isOverflow(element: HTMLUListElement): boolean {
        return element.scrollWidth > element.clientWidth;
    }

    useLayoutEffect(() => {
        if (listContainerRef.current && !isOverflow(listContainerRef.current)) {
            setShowLeftShadowBox(false);
            setShowRightShadowBox(false);
        }
    }, [children]);

    return (
        <ul
            ref={listContainerRef}
            className={classNames.container}
            onScroll={() => listContainerRef.current && detectScroll(listContainerRef.current)}
            data-testid="shadowBoxWrapperContainer"
        >
            {showLeftShadowBox && (
                <div
                    className={classNames.leftShadowBox}
                    style={{
                        background: `linear-gradient(90deg, ${linearGradient.first} 0%, ${linearGradient.second} 35%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperLeftShadowBox"
                ></div>
            )}
            {children}
            {showRightShadowBox && (
                <div
                    className={classNames.rightShadowBox}
                    style={{
                        background: `linear-gradient(270deg, ${linearGradient.first} 0%, ${linearGradient.second} 35%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperRightShadowBox"
                ></div>
            )}
        </ul>
    );
};

export default InlineShadowBoxWrapper;
