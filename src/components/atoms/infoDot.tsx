import React, { ReactElement, useEffect, useRef, useState } from "react";
import { i18n } from "../../i18n";

interface Props {
    className?: string;
    closable?: boolean;
    languageUser?: string;
    fCallBackCancel?: () => void;
    isSuccess: boolean;
    updateCooldown?: number;
}

const InfoDot = ({
    className,
    closable = true,
    languageUser = "en_US",
    fCallBackCancel,
    isSuccess,
    updateCooldown = 5,
}: Props): ReactElement => {
    const myLanguage = i18n.getFixedT(languageUser);
    const [progress, setProgress] = useState(0);
    const timerCall = useRef<NodeJS.Timeout>();
    const [message, setMessage] = useState("update");
    const [closeDisplay, setCloseDisplay] = useState(true);

    useEffect(() => {
        if (message == "update") {
            setTimeout(() => {
                setProgress(100);
            }, 50);

            timerCall.current = setTimeout(() => {
                if (isSuccess) {
                    setMessage("success");
                    setCloseDisplay(false);
                } else {
                    setMessage("error");
                    setCloseDisplay(false);
                }
            }, (updateCooldown + 1) * 1000);
        }
        return () => clearTimeout(timerCall.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    function renderSwitchDotMessage(message: string) {
        switch (message) {
            case "success":
                return (
                    <div data-testid="dotSuccess" className="text-neo-green text-xs font-bold">
                        {myLanguage("dot.success").toUpperCase()}
                    </div>
                );

            case "update":
                return (
                    <div
                        data-testid="dotUpdating"
                        className="text-neo-blue border-b-2 text-xs font-bold whitespace-nowrap"
                        style={{
                            width: progress + "%",
                            transition: updateCooldown + "s linear",
                            transitionDelay: "0.5s",
                            borderColor: "#22AAFF",
                        }}
                    >
                        {myLanguage("dot.update").toUpperCase()}
                    </div>
                );

            case "error":
                return (
                    <div data-testid="dotError" className="text-neo-red text-xs font-bold">
                        {myLanguage("dot.error").toUpperCase()}
                    </div>
                );

            default:
                return (
                    <div data-testid="dotSuccess" className="text-neo-green text-xs font-bold">
                        {myLanguage("dot.success").toUpperCase()}
                    </div>
                );
        }
    }

    return (
        <div data-testid="dotClassName" className={`flex ${className}`}>
            <div>{renderSwitchDotMessage(message)}</div>
            {closable && closeDisplay && (
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
