import React, { ReactElement, ReactNode, RefObject, useLayoutEffect, useState } from "react";

interface Props {
    refP: RefObject<HTMLUListElement>;
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

const InlineShadowBoxWrapper = ({ children, classNames, linearGradient, refP }: Props): ReactElement => {
    const [showLeftShadowBox, setShowLeftShadowBox] = useState(false);
    const [showRightShadowBox, setShowRightShadowBox] = useState(true);

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
        if (refP.current && !isOverflow(refP.current)) {
            setShowLeftShadowBox(false);
            setShowRightShadowBox(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    return (
        <ul
            ref={refP}
            className={classNames.container}
            onScroll={() => refP.current && detectScroll(refP.current)}
            data-testid="inlineShadowBoxWrapperContainer"
        >
            {showLeftShadowBox && (
                <div
                    className={classNames.leftShadowBox}
                    style={{
                        background: `linear-gradient(90deg, ${linearGradient.first} 0%, ${linearGradient.second} 35%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="inlineShadowBoxWrapperLeftShadowBox"
                ></div>
            )}
            {children}
            {showRightShadowBox && (
                <div
                    className={classNames.rightShadowBox}
                    style={{
                        background: `linear-gradient(270deg, ${linearGradient.first} 0%, ${linearGradient.second} 35%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="inlineShadowBoxWrapperRightShadowBox"
                ></div>
            )}
        </ul>
    );
};

export default InlineShadowBoxWrapper;
