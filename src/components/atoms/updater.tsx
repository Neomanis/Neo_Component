import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "../../i18n";

interface Props {
    className?: string;
    errorMessage?: string;
    isCancelable?: boolean;
    isSuccess?: boolean;
    isUpdate?: boolean;
    isError?: boolean;
    fCallBackCancel?: () => void;
    updateCooldown?: number;
    trigger?: boolean;
}

const Updater = ({
    errorMessage,
    className,
    isCancelable,
    isSuccess,
    isUpdate,
    isError,
    fCallBackCancel,
    updateCooldown = 4000,
    trigger,
}: Props): ReactElement => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);
    const [viewBorder, setViewBorder] = useState(true);

    useEffect(() => {
        if (isUpdate) {
            setTimeout(() => {
                setProgress(100);
            }, 100);
        } else {
            setProgress(0);
        }
    }, [isUpdate, trigger]);

    useEffect(() => {
        setViewBorder(false);
        setTimeout(() => {
            setProgress(0);
            setViewBorder(true);
        }, 50);
    }, [trigger]);

    return (
        <div data-testid="dotClassName" className={`flex ${className}`}>
            {isSuccess && (
                <div data-testid="dotSuccess" className="text-neo-green text-xs font-bold">
                    {t("dot.success").toUpperCase()}
                </div>
            )}
            {isUpdate && (
                <div data-testid="dotUpdating" className="text-neo-blue  text-xs font-bold whitespace-nowrap relative">
                    {t("dot.update").toUpperCase()}
                    {viewBorder && (
                        <div
                            style={{
                                width: progress + "%",
                                transition: updateCooldown / 1000 + "s linear",
                                transitionDelay: "0.5s",
                                borderColor: "#22AAFF",
                            }}
                            className="absolute border-b-2 bottom-0 left-0"
                        ></div>
                    )}
                </div>
            )}
            {isError && (
                <div data-testid="dotError" className="text-neo-red text-xs font-bold">
                    {errorMessage ? errorMessage : t("dot.error").toUpperCase()}
                </div>
            )}
            {isCancelable && (
                <div
                    data-testid="dotClose"
                    className="pl-2 text-neo-red cursor-pointer text-xs font-bold"
                    onClick={(): void => fCallBackCancel()}
                >
                    {t("dot.cancel").toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default Updater;
