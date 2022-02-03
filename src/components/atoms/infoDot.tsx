import React, { ReactElement, useEffect, useRef, useState } from "react";
import { i18n } from "../../i18n";

interface Props {
    errorMessage?: string;
    className?: string;
    isCancelable?: boolean;
    isSuccess?: boolean;
    isUpdate?: boolean;
    isError?: boolean;
    languageUser?: string;
    fCallBackCancel?: () => void;
    updateCooldown?: number;
    trigger?: boolean;
}

const InfoDot = ({
    errorMessage,
    className,
    isCancelable,
    isSuccess,
    isUpdate,
    isError,
    languageUser = "en_US",
    fCallBackCancel,
    updateCooldown = 4000,
    trigger,
}: Props): ReactElement => {
    const myLanguage = i18n.getFixedT(languageUser);
    const [progress, setProgress] = useState(0);
    const timerCall = useRef<NodeJS.Timeout>();
    const timerAnnim = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (!trigger) {
            clearTimeout(timerAnnim.current);
            clearTimeout(timerCall.current);
            setProgress(0);
        } else {
            timerAnnim.current = setTimeout(() => {
                setProgress(100);
            }, 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    return (
        <div data-testid="dotClassName" className={`flex ${className}`}>
            {isSuccess && (
                <div data-testid="dotSuccess" className="text-neo-green text-xs font-bold">
                    {myLanguage("dot.success").toUpperCase()}
                </div>
            )}
            {isUpdate && trigger && (
                <div data-testid="dotUpdating" className="text-neo-blue text-xs font-bold whitespace-nowrap relative">
                    {myLanguage("dot.update").toUpperCase()}
                    <div
                        style={{
                            width: progress + "%",
                            transition: updateCooldown / 1000 + "s linear",
                            transitionDelay: "0.5s",
                            borderColor: "#22AAFF",
                        }}
                        className="absolute border-b-2 bottom-0 left-0"
                    ></div>
                </div>
            )}
            {isError && (
                <div data-testid="dotError" className="text-neo-red text-xs font-bold">
                    {errorMessage ? errorMessage : myLanguage("dot.error").toUpperCase()}
                </div>
            )}
            {isCancelable && (
                <div
                    data-testid="dotClose"
                    className="pl-2 text-neo-red cursor-pointer text-xs font-bold"
                    onClick={(): void => {
                        fCallBackCancel();
                        setProgress(0);
                        clearTimeout(timerCall.current);
                    }}
                >
                    {myLanguage("dot.cancel").toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default InfoDot;
