import React, { ReactElement, ReactNode, RefObject, useLayoutEffect, useRef, useState } from "react";

interface Props {
    refParent?: RefObject<HTMLUListElement>;
    children: ReactNode;
    classNames: {
        topShadowBox: string;
        bottomShadowBox: string;
        container: string;
    };
    linearGradient: {
        first: string;
        second: string;
    };
}

const ShadowBoxWrapper = ({ children, classNames, linearGradient, refParent }: Props): ReactElement => {
    const [showTopShadowBox, setShowTopShadowBox] = useState(false);
    const [showBottomShadowBox, setShowBottomShadowBox] = useState(true);

    const listContainerRef = useRef<HTMLUListElement>(null);

    function detectScroll(ref: HTMLUListElement): void {
        const scrollPercentage = ref.scrollTop / (ref.scrollHeight - ref.clientHeight);
        if (scrollPercentage === 0) {
            setShowTopShadowBox(false);
            setShowBottomShadowBox(true);
        }
        if (scrollPercentage === 1) {
            setShowTopShadowBox(true);
            setShowBottomShadowBox(false);
        }
        if (scrollPercentage > 0 && scrollPercentage < 1) {
            setShowTopShadowBox(true);
            setShowBottomShadowBox(true);
        }
    }

    function isOverflow(element: HTMLUListElement): boolean {
        return element.scrollHeight > element.clientHeight;
    }

    useLayoutEffect(() => {
        if (refParent && refParent.current) {
            if (!isOverflow(refParent.current)) {
                setShowTopShadowBox(false);
                setShowBottomShadowBox(false);
            } else {
                detectScroll(refParent.current);
            }
        } else if (listContainerRef.current) {
            if (!isOverflow(listContainerRef.current)) {
                setShowTopShadowBox(false);
                setShowBottomShadowBox(false);
            } else {
                detectScroll(listContainerRef.current);
            }
        }
    }, [children]);

    return (
        <ul
            ref={refParent ? refParent : listContainerRef}
            className={classNames.container}
            onScroll={() =>
                refParent
                    ? refParent.current && detectScroll(refParent.current)
                    : listContainerRef.current && detectScroll(listContainerRef.current)
            }
            data-testid="shadowBoxWrapperContainer"
        >
            {showTopShadowBox && (
                <div
                    className={classNames.topShadowBox}
                    style={{
                        background: `linear-gradient(180deg, ${linearGradient.first} 0%, ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperTopShadowBox"
                ></div>
            )}
            {children}
            {showBottomShadowBox && (
                <div
                    className={classNames.bottomShadowBox}
                    style={{
                        background: `linear-gradient(0deg, ${linearGradient.first} 0%, ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperBottomShadowBox"
                ></div>
            )}
        </ul>
    );
};

export default ShadowBoxWrapper;
