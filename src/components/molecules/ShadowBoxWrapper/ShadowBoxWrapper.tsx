import React, { CSSProperties, ReactElement, ReactNode, RefObject, useLayoutEffect, useRef, useState } from "react";
import { classNames as createClassNames } from "@/utils/tools";
export interface ShadowBoxWrapperProps {
    refParent?: RefObject<HTMLDivElement>;
    children: ReactNode;
    classNames?: {
        topShadowBox?: string;
        bottomShadowBox?: string;
        container?: string;
    };
    linearGradient:
        | {
              first: string;
              second: string;
          }
        | "bg-A"
        | "bg-B";
    containerStyle?: CSSProperties;
}

const ShadowBoxWrapper = ({
    children,
    classNames,
    linearGradient,
    refParent,
    containerStyle,
}: ShadowBoxWrapperProps): ReactElement => {
    const [showTopShadowBox, setShowTopShadowBox] = useState(false);
    const [showBottomShadowBox, setShowBottomShadowBox] = useState(true);

    const listContainerRef = useRef<HTMLDivElement>(null);

    switch (linearGradient) {
        case "bg-A":
            linearGradient = { first: "rgb(09, 40, 71)", second: "rgba(09, 40, 71,0.5)" };
            break;
        case "bg-B":
            linearGradient = { first: "rgb(14, 56, 100)", second: "rgba(14, 56, 100,0.5)" };
            break;
    }

    function detectScroll(ref: HTMLDivElement): void {
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

    function isOverflow(element: HTMLDivElement): boolean {
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
        <div
            ref={refParent ? refParent : listContainerRef}
            className={createClassNames(
                "list-none overflow-y-scroll no-scrollbar",
                classNames.container ?? "h-full w-full"
            )}
            style={containerStyle}
            onScroll={() =>
                refParent
                    ? refParent.current && detectScroll(refParent.current)
                    : listContainerRef.current && detectScroll(listContainerRef.current)
            }
            data-testid="shadowBoxWrapperContainer"
        >
            {showTopShadowBox && (
                <div
                    className={createClassNames("w-full absolute z-20 left-0", classNames.topShadowBox ?? "top-0 h-10")}
                    style={{
                        background: `linear-gradient(180deg, ${linearGradient.first} 0%, ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperTopShadowBox"
                ></div>
            )}
            {children}
            {showBottomShadowBox && (
                <div
                    className={createClassNames(
                        "w-full absolute z-20 left-0",
                        classNames.bottomShadowBox ?? "bottom-0 h-10"
                    )}
                    style={{
                        background: `linear-gradient(0deg, ${linearGradient.first} 0%, ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperBottomShadowBox"
                ></div>
            )}
        </div>
    );
};

export default ShadowBoxWrapper;
