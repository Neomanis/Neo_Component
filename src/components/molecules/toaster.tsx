import React, { ReactElement, useEffect, useRef, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";
import { NeoLogo, NeoLogoSad } from "../../img/svg";

interface Props {
    className?: string;
    closable?: boolean;
    data: string;
    dataClassName?: string;
    emotion?: string;
    fCallBackCancel?: () => void;
    fCallBackRefresh?: () => void;
    progressColor1?: string;
    progressColor2?: string;
    refreshing?: boolean;
    refreshDuration?: number;
    title?: string;
    titleClassName?: string;
}

const Toaster = ({
    className = "bg-neo-bg-B rounded-lg shadow-md text-white",
    closable = false,
    data,
    dataClassName,
    emotion,
    fCallBackCancel,
    fCallBackRefresh,
    progressColor1 = "#ff5155",
    progressColor2 = "#ff1664",
    refreshing = false,
    refreshDuration = 5,
    title,
    titleClassName,
}: Props): ReactElement => {
    const [progress, setProgress] = useState(0);
    const timerCall = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (refreshing) {
            setTimeout(() => {
                setProgress(100);
            }, 50);

            timerCall.current = setTimeout(() => {
                fCallBackRefresh();
            }, (refreshDuration + 1) * 1000);
        }
        return () => clearTimeout(timerCall.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing]);

    function renderSwitchNeoLogo(emotion) {
        switch (emotion) {
            case "happy":
                return <NeoLogo className="animate-bounceSlow" viewBox="225 0 550 325" />;

            case "sad":
                return <NeoLogoSad className="animate-shakeX" viewBox="225 0 510 325" />;

            default:
                return <NeoLogo className="animate-bounceSlow" viewBox="225 0 550 325" />;
        }
    }

    return (
        <div className={`flex w-full py-3 relative overflow-hidden ${className}`} data-testid="toastClassName">
            <div className="flex items-center justify-center w-3/12">{renderSwitchNeoLogo(emotion)}</div>
            <div className="flex items-center py-2 w-9/12">
                <div className="pr-2">
                    <span className={`${titleClassName}`} data-testid="toastTitle">
                        {title}
                    </span>
                    <p className={`${dataClassName}`} data-testid="toastData">
                        {data}
                    </p>
                </div>
            </div>
            {refreshing && (
                <div className="absolute bottom-0 w-full">
                    <div
                        className="py-1 border-b-4"
                        style={{
                            width: progress + "%",
                            transition: refreshDuration + "s linear",
                            transitionDelay: "0.5s",
                            borderImageSlice: "1",
                            borderImageSource:
                                "linear-gradient(to left, " + progressColor1 + ", " + progressColor2 + ")",
                        }}
                    ></div>
                </div>
            )}
            {closable && (
                <div className="pr-2 -mt-3">
                    <Button
                        fontIcon={faTimes}
                        className={"text-neo-link opacity-50 transform hover:scale-105"}
                        fCallback={(): void => {
                            fCallBackCancel();
                            setProgress(0);
                            clearTimeout(timerCall.current);
                        }}
                        testId="toasterClose"
                    />
                </div>
            )}
        </div>
    );
};

export default Toaster;
