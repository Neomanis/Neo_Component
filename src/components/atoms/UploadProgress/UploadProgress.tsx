import React from "react";
import { useTranslation } from "@neomanis/neo-translation";

export interface UploadProgressProps {
    uploadProgress: number;
}

export default function UploadProgress({ uploadProgress }: UploadProgressProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1 w-full items-center">
            <div className="text-white text-xs">{t("global.uploading")}</div>
            <div className="w-full rounded-full bg-neo-blue-secondary overflow-hidden">
                <div
                    data-testid="progress-bar"
                    className="bg-neo-green text-xs font-medium text-blue-100 text-center p-0.5 px-1 h-2 leading-none rounded-full transition-all ease-out duration-500"
                    style={{ width: `${uploadProgress}%` }}
                ></div>
            </div>
        </div>
    );
}
