import React, { ReactElement, useEffect, useRef, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";
import { NeoLogo, NeoLogoSad } from "../../img/svg";

interface Props {
    className?: string;
    closable?: boolean;
    data: string;
    emotion?: string;
    fCallBackCancel?: () => void;
    fCallBackRefresh?: () => void;
    refreshing?: boolean;
    refreshDuration?: number;
    title?: string;
}

const Toaster = ({
    className,
    closable = false,
    data,
    emotion,
    fCallBackCancel,
    fCallBackRefresh,
    refreshing = false,
    refreshDuration = 5,
    title,
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
        <div
            className={`flex w-full bg-neo-bg-B rounded-lg shadow-md py-3 relative overflow-hidden ${className}`}
            data-testid="toastClassName"
        >
            <div className="flex items-center justify-center w-1/5">{renderSwitchNeoLogo(emotion)}</div>

            <div className="flex items-center py-2 w-4/5">
                <div className="px-3">
                    <span className="font-semibold text-white" data-testid="toastTitle">
                        {title}
                    </span>
                    <p className="text-sm text-white" data-testid="toastData">
                        {data}
                    </p>
                </div>
            </div>
            {refreshing && (
                <div className="absolute bottom-0 w-full">
                    <div
                        className="text-xs leading-none py-1 text-center text-white border-b-4"
                        style={{
                            width: progress + "%",
                            transition: refreshDuration + "s linear",
                            transitionDelay: "0.5s",
                            borderImageSlice: "1",
                            borderImageSource: "linear-gradient(to left, #ff5155, #ff1664)",
                        }}
                    ></div>
                </div>
            )}
            {closable && (
                <div className="p-1 -mt-3">
                    <Button
                        fontIcon={faTimes}
                        className={"text-white opacity-30 flex items-center justify-center rounded-lg mx-2"}
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