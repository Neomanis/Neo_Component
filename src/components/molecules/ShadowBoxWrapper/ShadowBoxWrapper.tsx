import React, { CSSProperties, ReactElement, ReactNode, RefObject, useLayoutEffect, useRef, useState } from "react";
import { classNames as createClassNames } from "@/utils/tools";
export interface ShadowBoxWrapperProps {
    children: ReactNode;
    refP?: RefObject<HTMLUListElement>;
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
    sizeShawbox?: string;
    inline?: boolean;
}

const ShadowBoxWrapper = ({
    children,
    refP,
    linearGradient,
    containerStyle,
    sizeShawbox,
    inline,
}: ShadowBoxWrapperProps): ReactElement => {
    const [showStartShadowBox, setShowStartShadowBox] = useState(false);
    const [showEndShadowBox, setShowEndShadowBox] = useState(true);

    const defaultRef = useRef<HTMLUListElement>(null);
    const listContainerRef = refP ?? defaultRef;

    switch (linearGradient) {
        case "bg-A":
            linearGradient = { first: "rgb(09, 40, 71)", second: "rgba(09, 40, 71,0.5)" };
            break;
        case "bg-B":
            linearGradient = { first: "rgb(14, 56, 100)", second: "rgba(14, 56, 100,0.5)" };
            break;
    }

    function detectScroll(ref: HTMLUListElement): void {
        const scrollPercentage = inline
            ? ref.scrollLeft / (ref.scrollWidth - ref.clientWidth)
            : ref.scrollTop / (ref.scrollHeight - ref.clientHeight);

        if (scrollPercentage === 0) {
            setShowStartShadowBox(false);
            setShowEndShadowBox(true);
        }
        if (scrollPercentage === 1) {
            setShowStartShadowBox(true);
            setShowEndShadowBox(false);
        }
        if (scrollPercentage > 0 && scrollPercentage < 1) {
            setShowStartShadowBox(true);
            setShowEndShadowBox(true);
        }
    }

    function isOverflow(element: HTMLUListElement): boolean {
        return inline ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight;
    }

    useLayoutEffect(() => {
        if (listContainerRef.current) {
            if (!isOverflow(listContainerRef.current)) {
                setShowStartShadowBox(false);
                setShowEndShadowBox(false);
            } else {
                detectScroll(listContainerRef.current);
            }
        }
    }, [children]);

    return (
        <div
            className={createClassNames("relative h-full w-full", inline && "flex")}
            style={containerStyle}
            data-testid="shadowBoxWrapperContainer"
        >
            {showStartShadowBox && (
                <div
                    className={createClassNames(
                        "absolute z-20 ",
                        inline ? `h-full left-0 ${sizeShawbox ?? "w-10"}` : `w-full top-0 ${sizeShawbox ?? "h-10"}`
                    )}
                    style={{
                        background: `linear-gradient(${inline ? "90deg" : "180deg"}, ${linearGradient.first} 0%, 
                        ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperTopShadowBox"
                ></div>
            )}
            <ul
                className={createClassNames(
                    "absolute list-none overflow-scroll no-scrollbar w-full h-full",
                    inline && "flex"
                )}
                onScroll={() => listContainerRef.current && detectScroll(listContainerRef.current)}
                ref={listContainerRef}
            >
                {children}
            </ul>
            {showEndShadowBox && (
                <div
                    className={createClassNames(
                        "absolute z-20",
                        inline ? `h-full right-0 ${sizeShawbox ?? "w-10"}` : `w-full bottom-0 ${sizeShawbox ?? "h-10"}`
                    )}
                    style={{
                        background: `linear-gradient(${inline ? "270deg" : "0deg"}, ${linearGradient.first} 0%, 
                        ${linearGradient.second} 55%, rgba(255,0,0,0) 100%)`,
                    }}
                    data-testid="shadowBoxWrapperBottomShadowBox"
                ></div>
            )}
        </div>
    );
};

export default ShadowBoxWrapper;
